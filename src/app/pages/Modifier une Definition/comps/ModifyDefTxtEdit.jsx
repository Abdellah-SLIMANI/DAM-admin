import React, { useEffect, useRef, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import JoditEditor from "jodit-react";
import { Button, Card, TextField } from '@material-ui/core'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom';
import ModifyBlock from './ModifyBlock';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import DomaineModify from './DomaineModify';
import ModifyTxt from './ModifyTxt';
import useAuth from 'app/hooks/useAuth';

export default function ModifyDefTxtEdit() {

    const [oldContent, setOldContent] = useState({})
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
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const lastLocation = useLastLocation()


    lastLocation &&sessionStorage.setItem('LastPath', lastLocation.pathname) 
    const url = lastLocation && lastLocation.pathname == "/Tableaux-de-bord" ? 'http://13.36.215.163:8000/api/administration/article/?titre=' : 'http://13.36.215.163:8000/api/elastic/search/?titre='
    function func(res) {
            if((lastLocation && lastLocation.pathname) == "/Tableaux-de-bord"){
                res && res.data.results.find((word) => {
                    console.log("WORD",word)
                    setOldContent(word)
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.titre === query.get('titre')){
                        console.log('WORD',word)
                        setOldContent(word)
                    }
                })
            }
    }

    function checkChanges(val,oldval){
        let value
        (val == oldval || val == '') ? value = oldval : value =val
        return value
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
                "titre":checkChanges(titre,oldContent.titre),
                "genre":checkChanges(genre,oldContent.genre),
                "terminologie":checkChanges(terminologie,oldContent.terminologie),
                "anglais":checkChanges(anglais,oldContent.anglais),
                "synthese":checkChanges(synthese,oldContent.synthese),
                "auteurs":checkChanges(auteurs,oldContent.auteurs),
                "etymologie":checkChanges(etymologie,oldContent.etymologie),
                "synonyme":checkChanges(synonyme,oldContent.synonyme),
                "antonyme":checkChanges(antonyme,oldContent.antonyme),
                "homonyme":checkChanges(homonyme,oldContent.homonyme),
                "sigle":checkChanges(sigle,oldContent.sigle),
                "symbole":checkChanges(symbole,oldContent.symbole),
                "abreviation":checkChanges(abreviation,oldContent.abreviation),
                "reference":checkChanges(reference,oldContent.reference),
                "renvoi":checkChanges(renvoi,oldContent.renvoi),
                "codes":checkChanges(codes,oldContent.codes),
                "edition":checkChanges(edition,oldContent.edition),
            }
        }

        axios.put("http://13.36.215.163:8000/api/administration/article/"+oldContent.id+"/", data ,config)
            .then(history.push(`/Tableaux-de-bord/`))
        
    }

    function draft(){
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        let data = {
            "titre": checkChanges(titre,oldContent.titre),
            'status': 'brouillon',
            'created_by': user.id,
            'data': {
                "titre":checkChanges(titre,oldContent.titre),
                "genre":checkChanges(genre,oldContent.genre),
                "terminologie":checkChanges(terminologie,oldContent.terminologie),
                "anglais":checkChanges(anglais,oldContent.anglais),
                "synthese":checkChanges(synthese,oldContent.synthese),
                "auteurs":checkChanges(auteurs,oldContent.auteurs),
                "etymologie":checkChanges(etymologie,oldContent.etymologie),
                "synonyme":checkChanges(synonyme,oldContent.synonyme),
                "antonyme":checkChanges(antonyme,oldContent.antonyme),
                "homonyme":checkChanges(homonyme,oldContent.homonyme),
                "sigle":checkChanges(sigle,oldContent.sigle),
                "symbole":checkChanges(symbole,oldContent.symbole),
                "abreviation":checkChanges(abreviation,oldContent.abreviation),
                "reference":checkChanges(reference,oldContent.reference),
                "renvoi":checkChanges(renvoi,oldContent.renvoi),
                "codes":checkChanges(codes,oldContent.codes),
                "edition":checkChanges(edition,oldContent.edition),
            }
        }

        axios.put("http://13.36.215.163:8000/api/administration/article/"+oldContent.id+"/", data ,config)
            .then(history.push(`/Tableaux-de-bord/`))
    }

    useEffect(() => {
         axios.get(url+query.get('titre'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => func(response))
    }, [])

    oldContent.definition && console.log("OC",oldContent.definition.map((def) => def.definition[0]))
    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
            <h4>Remplissez les champs ci-dessous pour modifier une définition.</h4>
                <div>
                    <Button className='bg-primary text-white' onClick={()=>{draft()}}>Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white ml-2' onClick={()=>{soummetre()}}>Soumettre</Button>
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre" unmountOnExit={true}>
                <Row className='border p-5'>
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
                        
                    {/* <Card className='p-5'> */}
                    <Tab.Content>
                        <Tab.Pane eventKey="titre" >
                            <ModifyBlock value={content.titre} setValue={settitre}  oldValue = {oldContent.titre}/>      
                        </Tab.Pane>
                        <Tab.Pane eventKey="genre" >
                            <ModifyBlock value={content.genre} setValue={setgenre} oldValue = {oldContent.genre}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="terminologie" >
                            <ModifyBlock value={content.terminologie} setValue={setterminologie} oldValue = {oldContent.terminologie}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="anglais" >
                            <ModifyBlock value={content.anglais} setValue={setanglais} oldValue = {oldContent.anglais}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="synthese" >
                            {/* <ModifyBlock value={content.synthese} setValue={setsynthese} oldValue = {oldContent.definition &&  oldContent.definition.map((def,index) => def.definition.map(d => d))}/> */}
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="auteurs" >
                            <ModifyBlock value={content.auteurs} setValue={setauteurs} oldValue = {oldContent.auteurs}/>
                        </Tab.Pane> */}
                        <Tab.Pane eventKey="etymologie" >
                            <ModifyBlock value={content.etymologie} setValue={setetymologie} oldValue = {oldContent.etymologie}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="synonyme" >
                            <ModifyBlock value={content.synonyme} setValue={setsynonyme} oldValue = {oldContent.synonyme}/>
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="antonyme" >
                            <ModifyBlock value={content.antonyme} setValue={set} oldValue = {oldContent.antonyme && oldContent.antonyme.map(anto => anto)}/>
                        </Tab.Pane> */}
                        <Tab.Pane eventKey="homonyme" >
                            <ModifyBlock value={content.homonyme} setValue={sethomonyme} oldValue = {oldContent.homonyme}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sigle" >
                            <ModifyBlock value={content.sigle} setValue={setsigle} oldValue = {oldContent.sigle}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="symbole" >
                            <ModifyBlock value={content.symbole} setValue={setsymbole} oldValue = {oldContent.symbole}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="abreviation" >
                            <ModifyBlock value={content.abreviation} setValue={setabreviation} oldValue = {oldContent.abreviation}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reference" >
                            <ModifyBlock value={content.reference} setValue={setreference} oldValue = {oldContent.reference}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="renvoi" >
                            <ModifyBlock value={content.renvoi} setValue={setrenvoi} oldValue = {oldContent.renvoi}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="codes" >
                            <DomaineModify />
                        </Tab.Pane>
                        <Tab.Pane eventKey="edition">
                            <ModifyTxt  value={content.edition} setValue={setedition} oldVlaue= {oldContent.edition}/>
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
