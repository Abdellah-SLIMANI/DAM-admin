import React, { useEffect, useRef, useState } from 'react'
import { Col, Dropdown, Nav, Row, SplitButton } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card, TextField,CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import ModifyBlock from './ModifyBlock';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import DomaineModify from './DomaineModify';
import ModifyTxt from './ModifyTxt';
import useAuth from 'app/hooks/useAuth';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import { MatxSuspense } from 'app/components'

export default function ModifyDefTxtEdit() {

    const [oldContent, setOldContent] = useState({})
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const {user} = useAuth()
    const history = useHistory();
    const classes = useStyles()

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
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const lastLocation = useLastLocation()
    

    lastLocation &&  localStorage.setItem('LastPath',lastLocation.pathname) 
    console.log('condition',(localStorage.getItem('LastPath') == ("/Tableaux-de-bord/") || localStorage.getItem('LastPath') == ("/Tableaux-de-bord")), localStorage.getItem('LastPath'))
    const url = (localStorage.getItem('LastPath') == ("/Tableaux-de-bord/") || localStorage.getItem('LastPath') == ("/Tableaux-de-bord")) ? 'http://13.36.215.163:8000/api/administration/article/?titre=' : 'http://13.36.215.163:8000/api/elastic/search/?titre='
    const putUrl = (localStorage.getItem('LastPath') == ("/Tableaux-de-bord/") || localStorage.getItem('LastPath') == ("/Tableaux-de-bord")) ? 'http://13.36.215.163:8000/api/administration/article/'+oldContent.id+'/' : 'http://13.36.215.163:8000/api/elastic/search/?id='+oldContent.id

    console.log("ULRS=> \n url",url,'\n posturl',putUrl)
    function func(res) {
            if((localStorage.getItem('LastPath') == ("/Tableaux-de-bord/") || localStorage.getItem('LastPath') == ("/Tableaux-de-bord"))){
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
        if(oldContent != undefined && oldContent.data != undefined){
            if(val == oldval || val == ""){
                if(oldval == undefined){
                    oldval = ''
                }
                return oldval
            }
            return val
        }
    }

    function soummetre(){
        setLoadingS(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        let data = {
            "titre":checkChanges(titre,oldContent.titre),
            'status': 'soumis',
            'created_by': user.id,
            'data': {
                titre:checkChanges(titre,oldContent.data.titre),
                genre:checkChanges(genre,oldContent.data && oldContent.data.genre),
                terminologie:checkChanges(terminologie,oldContent.data && oldContent.data.terminologie),
                anglais:checkChanges(anglais,oldContent.data.anglais),
                synthese:checkChanges(synthese,oldContent.data.synthese),
                auteurs:checkChanges(auteurs,oldContent.data.auteurs),
                etymologie:checkChanges(etymologie,oldContent.data.etymologie),
                synonyme:checkChanges(synonyme,oldContent.data.synonyme),
                antonyme:checkChanges(antonyme,oldContent.data.antonyme),
                homonyme:checkChanges(homonyme,oldContent.data.homonyme),
                sigle:checkChanges(sigle,oldContent.data.sigle),
                symbole:checkChanges(symbole,oldContent.data.symbole),
                abreviation:checkChanges(abreviation,oldContent.data.abreviation),
                reference:checkChanges(reference,oldContent.data.reference),
                renvoi:checkChanges(renvoi,oldContent.data.renvoi),
                codes:checkChanges(codes,oldContent.data.codes),
                edition:checkChanges(edition,oldContent.data.edition),
            }
        }
        
        axios.put(putUrl, data ,config)
        .finally(()=>{
            setLoadingS(false)
            history.push(`/Tableaux-de-bord/`)
        })
        
    }

    function draft(){
        setLoadingB(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        console.log("SENT DATA" ,{
            titre:titre,
            genre:checkChanges(genre,oldContent.data.genre),
            terminologie:checkChanges(terminologie,oldContent.data.terminologie),
            anglais:checkChanges(anglais,oldContent.data.anglais),
            synthese:checkChanges(synthese,oldContent.data.synthese),
            auteurs:checkChanges(auteurs,oldContent.data.auteurs),
            etymologie:checkChanges(etymologie,oldContent.data.etymologie),
            synonyme:checkChanges(synonyme,oldContent.data.synonyme),
            antonyme:checkChanges(antonyme,oldContent.data.antonyme),
            homonyme:checkChanges(homonyme,oldContent.data.homonyme),
            sigle:checkChanges(sigle,oldContent.data.sigle),
            symbole:checkChanges(symbole,oldContent.data.symbole),
            abreviation:checkChanges(abreviation,oldContent.data.abreviation),
            reference:checkChanges(reference,oldContent.data.reference),
            renvoi:checkChanges(renvoi,oldContent.data.renvoi),
            codes:checkChanges(codes,oldContent.data.codes),
            edition:checkChanges(edition,oldContent.data.edition),
        } )
        let data = {
            "titre": checkChanges(titre,oldContent.titre),
            'status': 'brouillon',
            'created_by': user.id,
            'data': {
                titre:checkChanges(titre,oldContent.data.titre),
                genre:checkChanges(genre,oldContent.data.genre),
                terminologie:checkChanges(terminologie,oldContent.data.terminologie),
                anglais:checkChanges(anglais,oldContent.data.anglais),
                synthese:checkChanges(synthese,oldContent.data.synthese),
                auteurs:checkChanges(auteurs,oldContent.data.auteurs),
                etymologie:checkChanges(etymologie,oldContent.data.etymologie),
                synonyme:checkChanges(synonyme,oldContent.data.synonyme),
                antonyme:checkChanges(antonyme,oldContent.data.antonyme),
                homonyme:checkChanges(homonyme,oldContent.data.homonyme),
                sigle:checkChanges(sigle,oldContent.data.sigle),
                symbole:checkChanges(symbole,oldContent.data.symbole),
                abreviation:checkChanges(abreviation,oldContent.data.abreviation),
                reference:checkChanges(reference,oldContent.data.reference),
                renvoi:checkChanges(renvoi,oldContent.data.renvoi),
                codes:checkChanges(codes,oldContent.data.codes),
                edition:checkChanges(edition,oldContent.data.edition),
            }
        }

        axios.put(putUrl, data ,config)
            .then(res => console.log("RESSS CHANGED", res))
            .finally(()=>{
                setLoadingB(false)
                history.push(`/Tableaux-de-bord/`)
            })
    }

    useEffect(() => {
         axios.get(url+query.get('titre'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => func(response))
    }, [])

    console.log("OLD CONTENT" , oldContent)
    console.log("DEFINITIONS" , synthese)
    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
            <h4>Remplissez les champs ci-dessous pour modifier une définition.</h4>
                <div>
                    <Button className='text-white' variant='contained' color= 'primary' disabled={loadingB} type="submit" onClick={()=>{draft()}}>{loadingB &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white' variant='contained' color= 'primary' disabled={loadingS} type="submit" onClick={()=>{soummetre()}}>{loadingS &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Soumettre</Button>
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
                        
                    <Tab.Content>
                        <Tab.Pane eventKey="titre" >
                            <ModifyBlock value={titre} setValue={settitre}  oldValue = {oldContent.titre}/>      
                        </Tab.Pane>
                        <Tab.Pane eventKey="genre" >
                            <ModifyBlock value={genre} setValue={setgenre} oldValue = {(oldContent.data && oldContent.data.genre) || oldContent.s_cat}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="terminologie" >
                            <ModifyBlock value={terminologie} setValue={setterminologie} oldValue = {oldContent.data && oldContent.data.terminologie || oldContent.terminologia_anatomica}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="anglais" >
                            <ModifyBlock value={anglais} setValue={setanglais} oldValue = {oldContent.data && oldContent.data.anglais || oldContent.traduction_en}/>
                        </Tab.Pane>
                        <MatxSuspense>
                        <Tab.Pane eventKey="synthese" >
                        {
                            oldContent.definition && oldContent.definition.map((def, index) => <>
                                {oldContent.definition.length > synthese.length ? setsynthese([...synthese , {definition: '', commentaire: ''}]): null ,console.log("AFTER ADDING",synthese)}
                                <h4>Definition {index+1}</h4> 
                                {console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERE", synthese[index]&& synthese[index].definition ,synthese[index] && synthese[index].commentaire)}
                            <ModifyBlock value={synthese[index]&& synthese[index].definition} setValue={setsynthese} oldValue = {def.definition} index={index}/>
                                <h4>commentaire {index+1}</h4>
                            <ModifyBlock value={synthese[index] && synthese[index].commentaire} setValue={setsynthese} oldValue = {def.commentaire} index={index}/>
                            </>)
                        }
                        </Tab.Pane>   
                        </MatxSuspense>
                        {/* <Tab.Pane eventKey="definition2" >
                        <ModifyBlock value={synthese} setValue={setsynthese} oldValue = {oldContent.definition &&  oldContent.definition.map((def)=> def.definition)[1] + '<br /> <i><i>' +oldContent.definition.map((def)=> def.commentaire)[0] }/>

                        </Tab.Pane> */}
                        <Tab.Pane eventKey="auteurs" >
                            <ModifyBlock value={auteurs} setValue={setauteurs} oldValue = {oldContent.auteurs}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="etymologie" >
                            <ModifyBlock value={etymologie} setValue={setetymologie} oldValue = {oldContent.etymologie}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="synonyme" >
                            <ModifyBlock value={synonyme} setValue={setsynonyme} oldValue = {oldContent.synonyme}/>
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="antonyme" >
                            <ModifyBlock value={content.antonyme} setValue={set} oldValue = {oldContent.antonyme && oldContent.antonyme.map(anto => anto)}/>
                        </Tab.Pane> */}
                        <Tab.Pane eventKey="homonyme" >
                            <ModifyBlock value={homonyme} setValue={sethomonyme} oldValue = {oldContent.homonyme}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sigle" >
                            <ModifyBlock value={sigle} setValue={setsigle} oldValue = {oldContent.sigle}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="symbole" >
                            <ModifyBlock value={symbole} setValue={setsymbole} oldValue = {oldContent.data && oldContent.data.symbole || oldContent.symbole}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="abreviation" >
                            <ModifyBlock value={abreviation} setValue={setabreviation} oldValue = {oldContent.data && oldContent.data.abreviation || oldContent.abreviation}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reference" >
                            <ModifyBlock value={reference} setValue={setreference} oldValue = {oldContent.reference}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="renvoi" >
                            <ModifyBlock value={renvoi} setValue={setrenvoi} oldValue = {oldContent.renvoi}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="codes" >
                            <DomaineModify value={codes} setValue={setcodes} oldValue= {oldContent.data && oldContent.data.codes || oldContent.domaines}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="edition">
                            <ModifyTxt  value={edition} setValue={setedition} oldValue={oldContent.data && oldContent.data.edition || oldContent.edition} option={true}/>              
                        </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        </div>
    )
}
