import React, { useRef, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import JoditEditor from "jodit-react";
import { Button, Card, TextField } from '@material-ui/core'
import './AddDefComp.css'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';

export default function AddDefComp() {

    const {user} = useAuth()

    const titreRef = useRef(null)
    const genreRef  = useRef(null)
    const terminologieRef  = useRef(null)
    const anglaisRef  = useRef(null)
    const syntheseRef  = useRef(null)
    const auteursRef  = useRef(null)
    const etymologieRef  = useRef(null)
    const synonymeRef  = useRef(null)
    const antonymeRef  = useRef(null)
    const homonymeRef  = useRef(null)
    const sigleRef  = useRef(null)
    const symboleRef  = useRef(null)
    const abreviationRef  = useRef(null)
    const referenceRef  = useRef(null)
    const renvoiRef  = useRef(null)
    const codesRef  = useRef(null)
    const editionRef  = useRef(null)
	// const [content, setContent] = useState({
    //     titre: '',
    //     genre: '',
    //     terminologie: '',
    //     anglais: '',
    //     synthese: '',
    //     auteurs: '',
    //     etymologie: '',
    //     synonyme: '',
    //     antonyme: '',
    //     homonyme: '',
    //     sigle: '',
    //     symbole: '',
    //     abreviation: '',
    //     reference: '',
    //     renvoi: '',
    //     codes: '',
    //     edition: new Date().getFullYear()
    // })

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
    const [edition, setedition] = useState(new Date().getFullYear())
    
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
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
            'data': {
                "titre" : titre,
                "genre" : genre,
                "terminologie": terminologie,
                "anglais" : anglais,
                "synthese": synthese,
                "auteurs" : auteurs,
                "etymologie": etymologie,
                "synonyme": synonyme,
                "antonyme": antonyme,
                "homonyme": homonyme,
                "sigle": sigle,
                "symbole": symbole,
                "abreviation": abreviation,
                "reference": reference,
                "renvoi": renvoi,
                "codes": codes,
                "edition": edition
            }
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)

        console.log("DATAAAA OF THE SUBMIT", data , user.email)
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
            'data': {
                "titre" : titre,
                "genre" : genre,
                "terminologie": terminologie,
                "anglais" : anglais,
                "synthese": synthese,
                "auteurs" : auteurs,
                "etymologie": etymologie,
                "synonyme": synonyme,
                "antonyme": antonyme,
                "homonyme": homonyme,
                "sigle": sigle,
                "symbole": symbole,
                "abreviation": abreviation,
                "reference": reference,
                "renvoi": renvoi,
                "codes": codes,
                "edition": edition
            }
        }

        axios.post("http://13.36.215.163:8000/api/administration/article/", data ,config)

        console.log("DATAAAA OF THE SUBMIT", data , user.email)
    }


    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
                <h4>Remplissez les champs ci-dessous pour ajouter une définition.</h4>
                <div>
                    <Button className='bg-primary text-white' onClick={()=>{draft()}}>Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white ml-2' onClick={()=>{soummetre()}}>Soumetre</Button>
                </div>
            </div>
            <Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre">
                <Row className='p-10'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="titre" className='bg-deafult'>Titre</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="genre">Genre</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='terminologie'>Terminologie (anatomica ou embryologica)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='anglais'>Traduction anglais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='synthese'>Synthèse et développement</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='auteurs'>Auteurs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='etymologie'>Etymologie</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='synonyme'>Synonyme</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='antonyme'>Antonyme</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='homonyme'>Homonyme</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='sigle'>Sigle</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='symbole'>Symbole</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='abreviation'>Abréviation</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='reference'>Référence</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='renvoi'>Renvoi vers les autres définitions séparées par des virgules</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='codes'>Codes internes de spécialité</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='edition'>Edition</Nav.Link>
                        </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="titre">
                        <JoditEditor
                            ref={titreRef}
                            value={titre}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => settitre(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey="genre">
                        <JoditEditor
                            ref={genreRef}
                            value={genre}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setgenre(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='terminologie'>
                        <JoditEditor
                            ref={terminologieRef}
                            value={terminologie}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setterminologie(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='anglais'>
                        <JoditEditor
                            ref={anglaisRef}
                            value={anglais}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setanglais(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='synthese'>
                        <JoditEditor
                            ref={syntheseRef}
                            value={synthese}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setsynthese(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='auteurs'>
                        <JoditEditor
                            ref={auteursRef}
                            value={auteurs}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setauteurs(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='etymologie'>
                        <JoditEditor
                            ref={etymologieRef}
                            value={etymologie}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setetymologie(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='synonyme'>
                        <JoditEditor
                            ref={synonymeRef}
                            value={synonyme}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setsynonyme(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='antonyme'>
                            <TextField 
                                value= {antonyme}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey='homonyme'>
                        <TextField 
                                value= {homonyme}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey='sigle'>
                        <JoditEditor
                            ref={sigleRef}
                            value={sigle}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setsigle(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='symbole'>
                        <JoditEditor
                            ref={symboleRef}
                            value={symbole}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setsymbole(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='abreviation'>
                            <TextField 
                                    value= {abreviation}
                                />
                        </Tab.Pane>
                        <Tab.Pane eventKey='reference'>
                        <JoditEditor
                            ref={referenceRef}
                            value={reference}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setreference(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='renvoi'>
                        <JoditEditor
                            ref={renvoiRef}
                            value={renvoi}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setrenvoi(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='codes'>
                        <TextField 
                                    value= {codes}
                                    onBlur={newContent => setcodes(newContent)}
                                />
                        </Tab.Pane>
                        <Tab.Pane eventKey='edition'>
                        <TextField 
                                    value= {edition}
                                    onBlur={newContent => setedition(newContent)}
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
