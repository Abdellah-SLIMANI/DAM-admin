import React, { useRef, useState } from 'react'
import TxtModify from './TxtModify';
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card, TextField } from '@material-ui/core'
import './AddDefComp.css'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import CodeAdd from './CodeAdd';

export default function AddDefComp() {
    const {user} = useAuth()
    const history = useHistory();
    const [titre, settitre] = useState('')
    const [genre, setgenre] = useState('')
    const [terminologie, setterminologie] = useState('')
    const [anglais, setanglais] = useState('')
    const [synthese, setsynthese] = useState('')
    const [auteurs, setauteurs] = useState('')
    const [etymologie, setetymologie] = useState('')
    const [synonyme, setsynonyme] = useState('')
    const [antonyme, setantonyme] = useState('')
    const [homonyme, sethomonyme] = useState('')
    const [sigle, setsigle] = useState('')
    const [symbole, setsymbole] = useState('')
    const [abreviation, setabreviation] = useState('')
    const [reference, setreference] = useState('')
    const [renvoi, setrenvoi] = useState('')
    const [codes, setcodes] = useState('')
    const [edition, setedition] = useState('')

    const content = {
        titre,
        genre,
        terminologie,
        anglais,
        synthese,
        auteurs,
        etymologie,
        synonyme,
        antonyme,
        homonyme,
        sigle,
        symbole,
        abreviation,
        reference,
        renvoi,
        codes,
        edition
    }
    function soummetre(){
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        let data = {
            "titre": titre,
            'status': 'soumis',
            'created_by': user.id,
            'data': content
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)
        .then(history.push(`/Tableaux-de-bord/`))
        
    }

    function draft(){
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        let data = {
            "titre": titre,
            'status': 'brouillon',
            'created_by': user.id,
            'data': content
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)
        .then(history.push(`/Tableaux-de-bord/`))
    }
    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
                <h4>Remplissez les champs ci-dessous pour ajouter une définition.</h4>
                <div>
                    <Button className='bg-primary text-white' onClick={()=>{draft()}}>Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white ml-2' onClick={()=>{soummetre()}}>Soumettre</Button>
                </div>
            </div>
            <Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre" unmountOnExit={true}>
                <Row className='p-10'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey="titre">Titre</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'> 
                            <Nav.Item>
                                <Nav.Link eventKey="genre">Genre</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='terminologie'>Terminologie (anatomica ou embryologica)</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='anglais'>Traduction anglais</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='synthese'>Synthèse et développement</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='auteurs'>Auteurs</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='etymologie'>Etymologie</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='synonyme'>Synonyme</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='antonyme'>Antonyme</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='homonyme'>Homonyme</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='sigle'>Sigle</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='symbole'>Symbole</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='abreviation'>Abréviation</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='reference'>Référence</Nav.Link>
                            </Nav.Item>
                        </Card >
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='renvoi'>Renvoi vers les autres définitions séparées par des virgules</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='codes'>Codes internes de spécialité</Nav.Link>
                            </Nav.Item>
                        </Card>
                        <Card className='m-1'>
                            <Nav.Item>
                                <Nav.Link eventKey='edition'>Edition</Nav.Link>
                            </Nav.Item>
                        </Card >
                        </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="titre">
                            <TxtModify value= {titre} setValue = {settitre}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="genre">
                            <TxtModify value= {genre} setValue = {setgenre}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="terminologie">
                            <TxtModify value= {terminologie} setValue = {setterminologie}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="anglais">
                            <TxtModify value= {anglais} setValue = {setanglais}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="synthese">
                            <TxtModify value= {synthese} setValue = {setsynthese}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="auteurs">
                            <TxtModify value= {auteurs} setValue = {setauteurs}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="etymologie">
                            <TxtModify value= {etymologie} setValue = {setetymologie}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="synonyme">
                            <TxtModify value= {synonyme} setValue = {setsynonyme}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="antonyme">
                            <TxtModify value= {antonyme} setValue = {setantonyme}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="homonyme">
                            <TxtModify value= {homonyme} setValue = {sethomonyme}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sigle">
                            <TxtModify value= {sigle} setValue = {setsigle}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="symbole">
                            <TxtModify value= {symbole} setValue = {setsymbole}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="abreviation">
                            <TxtModify value= {abreviation} setValue = {setabreviation}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reference">
                            <TxtModify value= {reference} setValue = {setreference}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="renvoi">
                            <TxtModify value= {renvoi} setValue = {setrenvoi}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="codes">
                            <CodeAdd />
                        </Tab.Pane>
                        <Tab.Pane eventKey="edition">
                            <TxtModify value= {edition} setValue = {setedition}/>
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
