import React, { useEffect, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card,CircularProgress } from '@material-ui/core'
import axios from 'axios'
import {  useHistory, useLocation } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import useAuth from 'app/hooks/useAuth';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import SearchAdd from '../Ajouter une definition/comps/SearchAdd'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import TxtModify from '../Ajouter une definition/comps/TxtModify'
import AjouterBiblio from '../Ajouter un auteur/comps/AjouterBiblio'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { Breadcrumb } from 'app/components'

export default function ModifyDefTxtEdit() {
    const mapEventkeyToTitle = {
        nom: 'Nom',
        prenom: 'Prénom',
        biographie : 'Biographie',
        bibliographie: 'Bibliographie',
        naissance: 'Date de naissance',
        deces: 'Date de décès',
        lien: 'Liens vers les définitions',
    }
    const initContent = {
        nom : '',
        prenom : '',
        biographie : '',
    }
    const [oldContent, setOldContent] = useState({})
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const [liens, setLiens] = useState([])
    const [bibliographie, setBibliographie] = useState([])
    const [wordId,setWordID] = useState('')
    const {user} = useAuth()
    const history = useHistory();
    const classes = useStyles()
    const [content, setContent] = useState(initContent)
    const [naissance, setNaissance] = React.useState(
        new Date('2014-08-18')
    )
    const [deces, setDeces] = React.useState(
        new Date('2014-08-18')
    )

    function handleNaissanceChange(date) {
        setNaissance(moment(date).format("YYYY-MM-DD"))
    }

    function handleDecesChange(date){
        setDeces(moment(date).format("YYYY-MM-DD"))
    }

    const handleSetValue = (k) =>{
        setContent({...content, ...k})
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const lastLocation = useLastLocation()
    

    lastLocation && localStorage.setItem('LastPath',lastLocation.pathname);
    const previousPath = localStorage.getItem('LastPath');
    const url = (previousPath == "/Tableaux-de-bord-auteurs/" || previousPath == "/Tableaux-de-bord-auteurs") ? 'http://13.36.215.163:8000/api/administration/auteur/?nom=' : 'http://13.36.215.163:8000/api/elastic/search/?nom='
    const putUrl = (previousPath == "/Tableaux-de-bord-auteurs/" || previousPath == "/Tableaux-de-bord-auteurs") ? 'http://13.36.215.163:8000/api/administration/auteur/'+wordId+'/' : 'http://13.36.215.163:8000/api/elastic/auteur/'+oldContent.id

    function func(res) {
            if((previousPath == "/Tableaux-de-bord-auteurs/" || previousPath == "/Tableaux-de-bord-auteurs")){
                // res && res.data.find((word) => {
                //     setOldContent(word.data)
                //     setWordID(word.id)
                // })
                // console.log("RRRRRRRRRRRRRES",res)
            }
            else{
                res && res.data.find((word) => {
                    if(word.titre === query.get('nom')){
                        setOldContent(word)
                    }
                })
            }
    }

    function checkChanges(val,oldval){
        if(oldContent != undefined){
            if(val == oldval || val == ""){
                if(oldval == undefined){
                    oldval = ''
                }
                return oldval
            }
            return val
        }
    }

    console.log("OLD CONTENT AUHTOR",oldContent)
    function checkArrayChange(newArray,oldArray){
            console.log('what json stringify new',JSON.stringify(newArray),'\nwhat json stringify old',JSON.stringify(oldArray, '\nwhat at last', JSON.stringify(newArray) == JSON.stringify(oldArray)))
           if(JSON.stringify(newArray) == JSON.stringify(oldArray) || newArray == []){
               console.log("what old",oldArray)
               return oldArray
        }
        console.log("what new",newArray)
        return newArray
    }
    console.log("HELLO")

    function soummetre(){
        setLoadingS(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        const role = user.role;

        let data = {
        }
        
        axios.put(putUrl, data ,config)
        .then(res => res.status == 200 ? history.push(`/Tableaux-de-bord-auteurs/`) : window.alert('Server Response',res))
        .finally(()=>{
            setLoadingS(false)
        })
        
    }
    function draft(){

        console.log(content)
        setLoadingB(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        let data = {
            "titre": checkChanges(content.titre , oldContent.titre),
            'status': 'brouillon',
            'created_by': user.id,
        }

        axios.put(putUrl, data ,config)
            .then(res => (
                res.status == 200 ? history.push(`/Tableaux-de-bord-auteurs/`) : window.alert('Server Response',res)
            ))
            .finally(()=>{
                setLoadingB(false)
            })
    }

    useEffect(() => {
         axios.get(url+query.get('nom'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => (func(response)))
    }, [])

    return (
        <div className = 'adminPageContainer p-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des auteurs', path: '/tableaux-de-bord-auteurs' },
                        { name: 'Modifier un auteur' },
                    ]}
                />
            <div className= 'mainArea addWordContainer mt-5'>
            <div className= 'd-flex justify-content-between mb-3'>
                <h4>Remplissez les champs ci-dessous pour ajouter un auteur.</h4>
                <div>
                <Button className='text-white' variant='contained' color= 'primary' disabled={loadingB} type="submit" onClick={()=>{soummetre({isDraft: true})}}>{loadingB &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white' variant='contained' color= 'primary' disabled={loadingS} type="submit" onClick={()=>{soummetre()}}>{loadingS &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Soumettre</Button>
                </div>
            </div>
            <Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre" unmountOnExit={true}>
                <Row className='p-10'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {
                            Object.keys(mapEventkeyToTitle).map(key => (
                            <Card className='m-1'> 
                                <Nav.Item>
                                    <Nav.Link eventKey={key}>{mapEventkeyToTitle[key]}</Nav.Link>
                                </Nav.Item>
                            </Card>
                            ))
                        }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                    {/* <Tab.Content>
                        { Object.keys(initContent).map(key => (
                            <Tab.Pane eventKey={key}>
                                <TxtModify value= {content[key]} setValue = {handleSetValue} fieldName={key} />
                            </Tab.Pane>
                        ))}
                            <Tab.Pane eventKey='bibliographie'>
                                <AjouterBiblio value= {bibliographie} setValue = {setBibliographie}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='deces'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date"
                            label="Date picker"
                            format="MM/dd/yyyy"
                            value={deces}
                            onChange={handleDecesChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />         
                        </MuiPickersUtilsProvider>                   
                        </Tab.Pane>
                            <Tab.Pane eventKey='naissance'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date"
                            label="Date picker"
                            format="MM/dd/yyyy"
                            value={naissance}
                            onChange={handleNaissanceChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>   
                            </Tab.Pane>
                            <Tab.Pane eventKey='lien'>
                                <SearchAdd value= {liens} setValue = {setLiens}/>
                            </Tab.Pane>
                    </Tab.Content> */}
                    </Col>
                </Row>
                </Tab.Container>
                </Card>
            </div>
        </div>
    )
}
