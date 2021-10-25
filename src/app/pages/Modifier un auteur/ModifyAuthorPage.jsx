import React, { useEffect, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card,CircularProgress } from '@material-ui/core'
import axios from 'axios'
import {  useHistory, useLocation } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import useAuth from 'app/hooks/useAuth';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day'
import { Breadcrumb } from 'app/components'
import ModifyBlock from '../Modifier une Definition/comps/ModifyBlock'
import ModifierBiblio from './comps/ModifierBiblio'
import ModifySearchArray from '../Modifier une Definition/comps/ModifySearchArray'
import { mapAuthorEventkeysToTitles, AuthorInitContent } from '../Utils'

export default function ModifyDefTxtEdit() {
    const [oldContent, setOldContent] = useState({})
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const [liens, setLiens] = useState([])
    const [bibliographie, setBibliographie] = useState([])
    const {user} = useAuth()
    const history = useHistory();
    const classes = useStyles()
    const [content, setContent] = useState(AuthorInitContent)
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
    const url = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/auteur/?nom=' : 'http://13.36.215.163:8000/api/elastic/auteur/?nom='
    const putUrl = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/auteur/'+oldContent.id+'/' : 'http://13.36.215.163:8000/api/administration/auteur/'

    function func(res) {
            if((previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord")){
                res && res.data.results.find((word) => {
                    setOldContent(word)
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.nom === query.get('nom')){
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

    console.log("OLD CONTENT AUHTOR",oldContent, "\nBibliographie",bibliographie)
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

    function soummetre({isDraft = false} = {}){
        isDraft ? setLoadingB(true) : setLoadingS(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        const role = user.role;
        const actionChecker = oldContent.action
        let data = {
                "elastic_id" : oldContent.elastic_id ? oldContent.elastic_id : "",
                "action": actionChecker ? actionChecker : (previousPath.includes('modifier-un-auteur') ? "Modification" : "Creation"),
                'created_by': user.id,
                'status': isDraft ? 'brouillon': role == 'Valideur' ? 'valide' : 'soumis',
                "nom": checkChanges(content.nom,oldContent.nom),
                "prenom": checkChanges(content.prenom,oldContent.prenom),
                "biographie": checkChanges(content.biographie,oldContent.biographie),
                "bibliographie": checkArrayChange(bibliographie,oldContent.bibliographie),
                "naissance": checkChanges(content.naissance,oldContent.naissance),
                "deces": checkChanges(content.deces,oldContent.deces),
                "liens" : checkArrayChange(liens,oldContent.liens),
        }
        if(previousPath.includes('modifier-un-auteur')) {
            axios.post(putUrl, data ,config)
            .then(res => res.statusText == "Created" || res.status == 200 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Error',res))
            .catch(e => console.log("Error while Posting data",e))
            .finally(isDraft ? setLoadingB(false) : setLoadingS(false))
        }else {
            axios.put(putUrl, data ,config)
            .then(res => (
                res.status == 200 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Response',res),
                console.log("RESSSSS",res)
            ))
            .finally(()=>{
                setLoadingB(false)
            })
        }

        
    }

    console.log("THE URL SEAESHED AT ", url+query.get('nom'))
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
                <Button className='text-white mr-2' variant='contained' color= 'primary' disabled={loadingB} type="submit" onClick={()=>{soummetre({isDraft: true})}}>{loadingB &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white ml-2' variant='contained' color= 'primary' disabled={loadingS} type="submit" onClick={()=>{soummetre()}}>{loadingS &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Soumettre</Button>
                </div>
            </div>
            <Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="nom" unmountOnExit={true}>
                <Row className='p-10'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {
                            Object.keys(mapAuthorEventkeysToTitles).map(key => (
                            <Card className='m-1'> 
                                <Nav.Item>
                                    <Nav.Link eventKey={key}>{mapAuthorEventkeysToTitles[key]}</Nav.Link>
                                </Nav.Item>
                            </Card>
                            ))
                        }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        { Object.keys(AuthorInitContent).map(key => (
                            <Tab.Pane eventKey={key}>
                                <ModifyBlock value= {content[key]} setValue = {handleSetValue} fieldName={key} oldValue={oldContent[key]}/>
                            </Tab.Pane>
                        ))}
                            <Tab.Pane eventKey='bibliographie'>
                                <ModifierBiblio value= {bibliographie} setValue = {setBibliographie} oldValue={oldContent.bibliographie}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='lien'>
                                <ModifySearchArray 
                                    value={liens}
                                    setValue={setLiens}
                                    oldValue={oldContent.liens}
                                />
                            </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
                </Card>
            </div>
        </div>
    )
}
