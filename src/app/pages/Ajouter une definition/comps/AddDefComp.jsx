import React, { useRef, useState } from 'react'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import TxtModify from './TxtModify';
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card, CircularProgress, IconButton, TextField } from '@material-ui/core'
import './AddDefComp.css'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import CodeAdd from './CodeAdd';
import AuthorAdd from './AuthorAdd';
import SearchAdd from './SearchAdd';

export default function AddDefComp() {
    const {user} = useAuth()
    const history = useHistory();
    const initContent = {
        titre : '',
        s_cat : '',
        terminologia_anatomica : '',
        traduction_en : '',
        etymologie : '',
        sigle : '',
        symbole : '',
        abreviation : '',
        references : '',
        edition : new Date().getFullYear().toString(),
    }
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const classes = useStyles()
    const [codes, setCodes] = useState([])
    const [auteurs, setAuteurs] = useState([])
    const [synthese, setSynthese] = useState([])
    const [synonyme, setSynonyme] = useState([])
    const [antonyme, setAntonyme] = useState([])
    const [homonyme, setHomonyme] = useState([])
    const [voir, setVoir] = useState([])
    const [content, setContent] = useState(initContent)

    const mapEventkeyToTitle = {
        titre: 'Entrée',
        s_cat: 'Genre',
        terminologia_anatomica : 'Terminologie (anatomica ou embryologica)',
        traduction_en: 'Traduction anglais',
        synthese: 'Définition et complément',
        auteurs: 'Auteurs',
        etymologie: 'Etymologie',
        synonyme: 'Synonyme',
        antonyme: 'Antonyme',
        homonyme: 'Homonyme',
        sigle: 'Sigle',
        symbole: 'Symbole',
        abreviation: 'Abréviation',
        references: 'Référence',
        voir: 'Voir aussi',
        codes: 'Codes internes de spécialité',
        edition: 'Edition'
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

        
        const role = user.role;
        let data = {
            "titre": content.titre,
            'status': isDraft ? 'brouillon': role == 'Valideur' ? 'valide' : 'soumis',
            'created_by': user.id,
            'data': {...content , auteurs:auteurs, definition:synthese, domaines: codes,synonyme:synonyme,antonyme: antonyme,voir: voir,homonyme:homonyme}
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Error',res))
        .catch(res => console.log("Error while Posting data",res))
        .finally(isDraft ? setLoadingB(false) : setLoadingS(false))
    }

    return (
        <div className = 'adminPageContainer mt-5'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
                <h4>Remplissez les champs ci-dessous pour ajouter une définition.</h4>
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

                            <Tab.Pane eventKey='synonyme'>
                                <SearchAdd 
                                    value={synonyme}
                                    setValue={setSynonyme}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='antonyme'>
                                <SearchAdd 
                                    value={antonyme}
                                    setValue={setAntonyme}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey='homonyme'>
                                <SearchAdd 
                                    value={homonyme}
                                    setValue={setHomonyme}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='voir'>
                                <SearchAdd 
                                    value={voir}
                                    setValue={setVoir}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='auteurs'>
                                <AuthorAdd 
                                        value= {auteurs} 
                                        setValue = {setAuteurs}
                                        type = 'author'
                                    />
                            </Tab.Pane>

                            <Tab.Pane eventKey='synthese'>
                                <AuthorAdd 
                                        value= {synthese} 
                                        setValue = {setSynthese}
                                        type = 'definition'
                                    />
                            </Tab.Pane>

                            <Tab.Pane eventKey='codes'>
                                <CodeAdd 
                                        value= {codes} 
                                        setValue = {setCodes}
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
