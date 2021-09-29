import React, { useEffect, useState } from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card,CircularProgress } from '@material-ui/core'
import axios from 'axios'
import {  useHistory, useLocation } from 'react-router-dom';
import ModifyBlock from './ModifyBlock';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import useAuth from 'app/hooks/useAuth';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import ArrayModify from './ArrayModify'
import DomaineModify from './DomaineModify'
import ModifySearchArray from './ModifySearchArray'

export default function ModifyDefTxtEdit() {
    const mapEventkeyToTitle = {
        titre: 'Entrée',
        s_cat: 'Genre',
        terminologia_anatomica : 'Terminologie (anatomica ou embryologica)',
        traduction_en: 'Traduction anglais',
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
        voir: 'Renvoi vers les autres définitions séparées par des virgules',
        codes: 'Codes internes de spécialité',
        edition: 'Edition'
    }
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

    const [oldContent, setOldContent] = useState({})
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const [codes, setCodes] = useState([])
    const [auteurs, setAuteurs] = useState([])
    const [synthese, setSynthese] = useState([])
    const [wordId,setWordID] = useState('')
    const [voir, setVoir] = useState([])   
    const [synonyme, setSynonyme] = useState([])
    const [antonyme, setAntonyme] = useState([])
    const [homonyme, setHomonyme] = useState([])
    const {user} = useAuth()
    const history = useHistory();
    const classes = useStyles()
    const [content, setContent] = useState(initContent)
    console.log("OLD CONTENT" , oldContent , auteurs,synthese)

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
    const url = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/article/?titre=' : 'http://13.36.215.163:8000/api/elastic/search/?titre='
    const putUrl = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/article/'+wordId+'/' : 'http://13.36.215.163:8000/api/elastic/search/?id='+oldContent.id

    function func(res) {
            if((previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord")){
                res && res.data.results.find((word) => {
                    setOldContent(word.data)
                    setWordID(word.id)
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.titre === query.get('titre')){
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
            "titre": checkChanges(content.titre , oldContent.titre),
            'status': role == 'Valideur' ? 'valide' : 'soumis',
            'created_by': user.id,
            'data': {
                ...content,
                titre: checkChanges(content.titre , oldContent.titre),
                s_cat: checkChanges(content.s_cat , oldContent.s_cat),
                terminologia_anatomica: checkChanges(content.terminologia_anatomica , oldContent.terminologia_anatomica),
                traduction_en: checkChanges(content.traduction_en , oldContent.traduction_en),
                etymologie: checkChanges(content.etymologie , oldContent.etymologie),
                synonyme: checkChanges(content.synonyme , oldContent.synonyme),
                antonyme: checkChanges(content.antonyme , oldContent.antonyme),
                homonyme: checkChanges(content.homonyme , oldContent.homonyme),
                sigle: checkChanges(content.sigle , oldContent.sigle),
                symbole: checkChanges(content.symbole , oldContent.symbole),
                abreviation: checkChanges(content.abreviation , oldContent.abreviation),
                references: checkChanges(content.references , oldContent.references),
                voir: checkChanges(content.renvoi , oldContent.renvoi),
                edition: checkChanges(content.edition , oldContent.edition),
                definition:checkArrayChange(synthese,oldContent.definition),
                auteurs: checkArrayChange(auteurs,oldContent.auteurs),
                domaines:checkChanges(codes, oldContent.domaines)
            }
        }
        
        axios.put(putUrl, data ,config)
        .then(res => res.status == 200 ? history.push(`/Tableaux-de-bord/`) : window.alert('Server Response',res))
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
            'data': {
                ...content,
                titre: checkChanges(content.titre , oldContent.titre),
                s_cat: checkChanges(content.s_cat , oldContent.s_cat),
                terminologia_anatomica: checkChanges(content.terminologia_anatomica , oldContent.terminologia_anatomica),
                traduction_en: checkChanges(content.traduction_en , oldContent.traduction_en),
                etymologie: checkChanges(content.etymologie , oldContent.etymologie),
                synonyme: checkChanges(synonyme , oldContent.synonyme),
                antonyme: checkChanges(antonyme , oldContent.antonyme),
                homonyme: checkChanges(homonyme, oldContent.homonyme),
                sigle: checkChanges(content.sigle , oldContent.sigle),
                symbole: checkChanges(content.symbole , oldContent.symbole),
                abreviation: checkChanges(content.abreviation , oldContent.abreviation),
                references: checkChanges(content.references , oldContent.references),
                voir: checkChanges(voir, oldContent.voir),
                edition: checkChanges(content.edition , oldContent.edition),
                definition:checkArrayChange(synthese,oldContent.definition),
                auteurs: checkArrayChange(auteurs,oldContent.auteurs),
                domaines:checkChanges(codes, oldContent.domaines)
            }
        }

        axios.put(putUrl, data ,config)
            .then(res => (
                res.status == 200 ? history.push(`/Tableaux-de-bord/`) : window.alert('Server Response',res)
            ))
            .finally(()=>{
                setLoadingB(false)
            })
    }

    useEffect(() => {
         axios.get(url+query.get('titre'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => (func(response)))
    }, [])

    return (
        <div className = 'adminPageContainer'>
            <div className= 'mainArea addWordContainer'>
            <div className= 'd-flex justify-content-between mb-3'>
            <h4>Remplissez les champs ci-dessous pour modifier une définition.</h4>
                <div>
                    <Button className='text-white' variant='contained' color= 'primary' type="submit" onClick={()=>{draft()}}>Enregistrer comme brouillon</Button>
                    <Button className='bg-green text-white' variant='contained' color= 'primary' disabled={loadingS} type="submit" onClick={()=>{soummetre()}}>{loadingS &&<CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>} Soumettre</Button>
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="titre" unmountOnExit={true}>
                <Row className='border p-5'>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {Object.keys(mapEventkeyToTitle).map(key => (
                            <Card className='m-1'>
                                <Nav.Item>
                                    <Nav.Link eventKey={key}>{mapEventkeyToTitle[key]}</Nav.Link>
                                </Nav.Item>
                            </Card>
                        ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                    {Object.keys(initContent).map(key => (
                    <Tab.Content>
                        <Tab.Pane eventKey={key} >
                            <ModifyBlock value={content[key]} setValue={handleSetValue} fieldName={key} oldValue = {oldContent && oldContent[key]}/>      
                        </Tab.Pane>
                    </Tab.Content>                        
                    ))}
                            <Tab.Pane eventKey='auteurs'>
                                <ArrayModify 
                                        value= {auteurs}
                                        setValue = {setAuteurs}
                                        oldValue = {oldContent.auteurs}
                                        type = 'author'
                                    />
                            </Tab.Pane>

                            <Tab.Pane eventKey='synonyme'>
                                <ModifySearchArray
                                    oldValue={oldContent.synonyme}
                                    value={synonyme}
                                    setValue={setSynonyme}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='antonyme'>
                                <ModifySearchArray
                                    oldValue={oldContent.antonyme}
                                    value={antonyme}
                                    setValue={setAntonyme}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey='homonyme'>
                                <ModifySearchArray 
                                    oldValue={oldContent.homonyme}
                                    value={homonyme}
                                    setValue={setHomonyme}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='voir'>
                                <ModifySearchArray 
                                    oldValue={oldContent.voir}
                                    value={voir}
                                    setValue={setVoir}
                                />
                            </Tab.Pane>

                            <Tab.Pane eventKey='synthese'>
                                <ArrayModify 
                                        value= {synthese} 
                                        setValue = {setSynthese}
                                        oldValue = {oldContent.definition} 
                                        type = 'definition'
                                    />
                            </Tab.Pane>

                            <Tab.Pane eventKey='codes'>
                                <DomaineModify 
                                        value= {codes} 
                                        setValue = {setCodes}
                                        oldValue = {oldContent.domaines}
                                    />
                            </Tab.Pane>

                    </Col>
                </Row>
                </Tab.Container>
            </div>
        </div>
    )
}
