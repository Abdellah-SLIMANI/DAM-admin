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


export default function AddDefComp() {
    const {user} = useAuth()
    const history = useHistory();
    const initContent = {
        titre : '',
        genre : '',
        terminologie : '',
        anglais : '',
        etymologie : '',
        synonyme : '',
        antonyme : '',
        homonyme : '',
        sigle : '',
        symbole : '',
        abreviation : '',
        references : '',
        renvoi : '',
        edition : new Date().getFullYear().toString(),
    }
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const classes = useStyles()
    const [codes, setCodes] = useState([])
    const [auteurs, setAuteurs] = useState([])
    const [synthese, setSynthese] = useState([])
    const [content, setContent] = useState(initContent)

    const mapEventkeyToTitle = {
        titre: 'Titre',
        genre: 'Genre',
        terminologie: 'Terminologie (anatomica ou embryologica)',
        anglais: 'Traduction anglais',
        synthese: 'Synthèse et développement',
        auteurs: 'Auteurs',
        etymologie: 'Etymologie',
        synonyme: 'Synonyme',
        antonyme: 'Antonyme',
        homonyme: 'Homonyme',
        sigle: 'Sigle',
        symbole: 'Symbole',
        abreviation: 'Abréviation',
        references: 'Référence',
        renvoi: 'Renvoi vers les autres définitions séparées par des virgules',
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

        let data = {
            "titre": content.titre,
            'status': isDraft ? 'brouillon': 'soumis',
            'created_by': user.id,
            'data': {...content , auteurs:auteurs, definition:synthese, domaines: codes, voir: content.renvoi}
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)
        .then(res => res.status == 201 ? history.push(`/Tableaux-de-bord/`) : window.alert('Server Error',res))
        .catch(e => console.log("Error while Posting data",e))
        .finally(isDraft ? setLoadingB(false) : setLoadingS(false))
    }

    return (
        <div className = 'adminPageContainer'>
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
