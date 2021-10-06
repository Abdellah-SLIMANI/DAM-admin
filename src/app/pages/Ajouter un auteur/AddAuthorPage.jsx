import React, { useRef, useState } from 'react'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import TxtModify from '../Ajouter une definition/comps/TxtModify';
import { Col, Nav, Row } from 'react-bootstrap'
import frLocale from "date-fns/locale/fr";
import Tab from 'react-bootstrap/Tab'
import { Button, Card, CircularProgress, IconButton, TextField } from '@material-ui/core'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import AjouterBiblio from './comps/AjouterBiblio';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import SearchAdd from '../Ajouter une definition/comps/SearchAdd';
import moment from 'moment';
import { Breadcrumb } from 'app/components';

export default function AddDefComp() {
    const [naissance, setNaissance] = React.useState(
        new Date('2014-08-18T21:11:54')
    )
    const [deces, setDeces] = React.useState(
        new Date('2014-08-18T21:11:54')
    )

    function handleNaissanceChange(date) {
        setNaissance(moment(date).format("YYYY-MM-DD"))
    }

    function handleDecesChange(date){
        setDeces(moment(date).format("YYYY-MM-DD"))
    }

    const {user} = useAuth()
    const history = useHistory();
    const initContent = {
        nom : '',
        prenom : '',
        biographie : '',
    }
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const classes = useStyles()
    const [liens, setLiens] = useState([])
    const [bibliographie, setBibliographie] = useState([])
    const [content, setContent] = useState(initContent)

    const mapEventkeyToTitle = {
        nom: 'Nom',
        prenom: 'Prénom',
        biographie : 'Biographie',
        bibliographie: 'Bibliographie',
        naissance: 'Date de naissance',
        deces: 'Date de décès',
        lien: 'Liens vers les définitions',
    }

    const handleSetValue = (k) =>{
        setContent({...content, ...k})
    }

    function soummetre({isDraft = false} = {}){
        isDraft ? setLoadingB(true) : setLoadingS(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        let data = {
            "action": "Creation",
            "status": isDraft ? 'brouillon' : "soumis",  
            'created_by': user.id,
            ...content,
            liens: liens,
            bibliographie: bibliographie,
            deces: deces,
            naissance: naissance,
        }

        axios.post("http://13.36.215.163:8000/api/administration/auteur/", data ,config)
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord-auteurs/`) : window.alert('Server Error',res))
        .catch(e => console.log("Error while Posting data",e))
        .finally(isDraft ? setLoadingB(false) : setLoadingS(false))
    }

    return (
        <div className = 'adminPageContainer p-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des auteurs', path: '/tableaux-de-bord-auteurs' },
                        { name: 'Ajouter un auteur' },
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
                    <Tab.Content>
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
                            format='yyyy-MM-dd'
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
                                views={["year", "month", "day"]}
                                format='yyyy MM dd'
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
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
                </Card>
            </div>
        </div>
    )
}
