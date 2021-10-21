import React, { useState } from 'react'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import TxtModify from '../Ajouter une definition/comps/TxtModify';
import { Col, Nav, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import { Button, Card, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import AjouterBiblio from './comps/AjouterBiblio';
import SearchAdd from '../Ajouter une definition/comps/SearchAdd';
import { Breadcrumb } from 'app/components';
export default function AddDefComp() {
    const  AuthorInitContent = {
        nom : '',
        prenom : '',
        biographie : '',
        naissance: '',
        deces: ''
    }
    
    const mapAuthorEventkeysToTitles = {
        nom: 'Nom',
        prenom: 'Prénom',
        biographie : 'Biographie',
        bibliographie: 'Bibliographie',
        naissance: 'Année de naissance',
        deces: 'Année de décès',
        lien: 'Liens vers les définitions',
    }
    const {user} = useAuth()
    const history = useHistory();
    const [loadingS, setLoadingS] = useState(false)
    const [loadingB, setLoadingB] = useState(false)
    const classes = useStyles()
    const [liens, setLiens] = useState([])
    const [bibliographie, setBibliographie] = useState([])
    const [content, setContent] = useState(AuthorInitContent)


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
        }

        axios.post("http://13.36.215.163:8000/api/administration/auteur/", data ,config)
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Error',res))
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
                                <TxtModify value= {content[key]} setValue = {handleSetValue} fieldName={key} />
                            </Tab.Pane>
                        ))}
                            <Tab.Pane eventKey='bibliographie'>
                                <AjouterBiblio value= {bibliographie} setValue = {setBibliographie}/>
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
