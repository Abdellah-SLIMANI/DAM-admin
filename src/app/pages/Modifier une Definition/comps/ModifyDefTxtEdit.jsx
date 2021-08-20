import React, { useEffect, useRef, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import JoditEditor from "jodit-react";
import { Button, Card, TextField } from '@material-ui/core'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export default function ModifyDefTxtEdit() {

    const titre = useRef(null)
    const genre = useRef(null)
    const terminologie = useRef(null)
    const anglais = useRef(null)
    const synthese = useRef(null)
    const auteurs = useRef(null)
    const etymologie = useRef(null)
    const synonyme = useRef(null)
    const antonyme = useRef(null)
    const homonyme = useRef(null)
    const sigle = useRef(null)
    const symbole = useRef(null)
    const abreviation = useRef(null)
    const reference = useRef(null)
    const renvoi = useRef(null)
    const codes = useRef(null)
    const edition = useRef(null)
    const [oldContent, setOldContent] = useState({})
	const [content, setContent] = useState({
        titre: '',
        genre: '',
        terminologie: '',
        anglais: '',
        synthese: '',
        auteurs: '',
        etymologie: '',
        synonyme: '',
        antonyme: '',
        homonyme: '',
        sigle: '',
        symbole: '',
        abreviation: '',
        reference: '',
        renvoi: '',
        codes: '',
        edition: new Date().getFullYear()
    })
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
      
    useEffect(() => {
         axios.get(`http://13.36.215.163:8000/api/elastic/search/?titre=${query.get('titre')}`)
            .then(response => response.data.find((word) => {
                if(word.titre === query.get('titre')){
                    console.log('WORD',word)
                    setOldContent(word)
                }
            }))
    }, [])
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
                <h2>Edition des définitions du dictionnaire</h2>
                <Button style={{background: '#A01102', color: 'white'}}>Soumetre</Button>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre">
                <Row className='border p-5'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="titre">Titre</Nav.Link>
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
                        
                    {/* <Card className='p-5'> */}
                    <Tab.Content>
                        <Tab.Pane eventKey="titre">
                        <div className='flex'>
                            <div className='d-flex flex-column'>
                            {/* <h4>Version {content.edition}</h4> */}
                            <JoditEditor
                                ref={titre}
                                value={content.titre} 
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            {/* <h4>Version {oldContent.data && oldContent.data.edition} (Ancien)</h4> */}
                            <JoditEditor
                                ref={titre}
                                value={oldContent && oldContent.titre}
                                config={{readonly: true}}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                        </div>
                        </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="genre">
                        <div className='flex'>
                            <div className='d-flex flex-column'>
                            <JoditEditor
                            ref={genre}
                            value={content.editor}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        <JoditEditor
                            ref={genre}
                            value={oldContent.editor}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                            </div>
                        </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='terminologie'>
                        <JoditEditor
                            ref={terminologie}
                            value={content.terminologie}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='anglais'>
                        <JoditEditor
                            ref={anglais}
                            value={content.anglais}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='synthese'>
                        <JoditEditor
                            ref={synthese}
                            value={content.synthese}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='auteurs'>
                        <JoditEditor
                            ref={auteurs}
                            value={content.auteurs}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='etymologie'>
                        <JoditEditor
                            ref={etymologie}
                            value={content.etymologie}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='synonyme'>
                        <JoditEditor
                            ref={synonyme}
                            value={content.synonyme}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='antonyme'>
                            <TextField 
                                value= {content.antonyme}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey='homonyme'>
                        <TextField 
                                value= {content.homonyme}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey='sigle'>
                        <JoditEditor
                            ref={sigle}
                            value={content.sigle}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='symbole'>
                        <JoditEditor
                            ref={symbole}
                            value={content.symbole}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='abreviation'>
                            <TextField 
                                    value= {content.abreviation}
                                />
                        </Tab.Pane>
                        <Tab.Pane eventKey='reference'>
                        <JoditEditor
                            ref={reference}
                            value={content.reference}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='renvoi'>
                        <JoditEditor
                            ref={renvoi}
                            value={content.renvoi}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey='codes'>
                        <TextField 
                                    value= {content.codes}
                                />
                        </Tab.Pane>
                        <Tab.Pane eventKey='edition'>
                        <TextField 
                                    value= {content.edition}
                                    onBlur={newContent => setContent(newContent)}
                                />
                        </Tab.Pane>
                    </Tab.Content>

                    {/* </Card> */}
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        </div>
    )
}
