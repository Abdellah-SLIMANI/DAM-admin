import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Button, Card,CircularProgress,Fab,Grid,Typography} from '@material-ui/core'
import axios from 'axios'
import {  useHistory, useLocation } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLastLocation } from 'react-router-last-location';
import useAuth from 'app/hooks/useAuth';
import {useDropzone} from 'react-dropzone';
import SimpleCard from 'app/components/cards/SimpleCard';
import PreviewContent from 'app/pages/Components/PreviewContent';
import {
  Stepper,
  Step,
  useStepper,
} from "react-progress-stepper";
import { Breadcrumb } from 'app/components';

export default function ModificationLot() {
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [oldContent, setOldContent] = useState({})
    const [loadingB, setLoadingB] = useState(false)
    const [word,setWord] = useState('')
    const {user} = useAuth()
    const history = useHistory();
    const [letters, setLetters] = useState()
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const lastLocation = useLastLocation()

    lastLocation && localStorage.setItem('LastPath',lastLocation.pathname);
    const previousPath = localStorage.getItem('LastPath');
    const isTabDeBordThePreviousPath = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord");
    
    const url = isTabDeBordThePreviousPath ? 'http://13.36.215.163:8000/api/administration/article/?titre=' : 'http://13.36.215.163:8000/api/elastic/search/?titre='
    const putUrl = isTabDeBordThePreviousPath ? 'http://13.36.215.163:8000/api/administration/article/'+word.id+'/' : 'http://13.36.215.163:8000/api/administration/article/'

    function func(res) {
            if((previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord")){
                res && res.data.results.find((word) => {
                    if(word.titre === query.get('titre')){
                        setOldContent(word.data)
                        setWord(word)
                    }
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.titre === query.get('titre')){
                        setOldContent(word)
                        setWord(word)
                    }
                })
            }
    }

    function draft(){
        setLoadingB(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const actionChecker = word.action
        let data = {
            "titre": previewWord.titre,
            'status': 'brouillon',
            "action": actionChecker ? actionChecker : (previousPath.includes('/modifier-une-definition') ? "Modification" : "Creation"),
            'created_by': oldContent.created_by ? oldContent.created_by : user.id,
            "elastic_id" : oldContent.id ? oldContent.id : "",
            'data': previewWord
        }

        if(previousPath == '/modifier-une-definition/'){
            axios.post(putUrl, data ,config)
            .then(res => (
                res.statusText == "Created" ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Response',res)
            ))
            .finally(()=>{
                setLoadingB(false)
            })
        }
        else {
            axios.put(putUrl, data ,config)
            .then(res => (
                (res.status == 200) || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Response',res)
            ))
            .finally(()=>{
                setLoadingB(false)
            })
        }
    }

    useEffect(() => {
         axios.get(url+query.get('titre'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => (func(response)))
            axios.get('http://13.36.215.163:8000/api/administration/get_letters/')
                .then(res => setLetters(res.data))
    }, [])

    //************************************************************************************************************/
    const [letter,setLetter] = useState()
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
    const previewWordRef = useRef(null)
    const {
        getRootProps,
        getInputProps,} = useDropzone({
        accept: ['.doc', '.docx'],
        accept: ['.doc', '.docx','/images*'],
        onDrop: acceptedFiles => {
          SubmitFile(acceptedFiles,letter);
        }
      });

      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));

      }, [files]);

      const SubmitFile = (acceptedFilesProp,letter) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        axios.post("http://13.36.215.163:8000/api/administration/upload_lot/"+letter+ "/", data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFilesProp[0].type
              }
          })
            .then(res => (setPreviewWord(res.data)))
      }

    return (
        <div className='flex-column m-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des definitions', path: '/tableaux-de-bord' },
                        { name: 'Modification par lot' },
                    ]}
            />
        <div className="pr-20 pl-20 flex mt-10" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}} >
                              <Button
                                  className='text-white mt-3 mb-3'
                                  style={{alignSelf: 'flex-start'}}
                                  variant='contained'
                                  disabled={step != 0}
                                  color= 'primary'
                                  target='_blank'
                              >
                                {loadingS &&<CircularProgress size={24}></CircularProgress>} Choix de la lettre
                              </Button>
                              <div {...getRootProps()}>
                              <Button
                                      className='text-white ml-3 mt-3 mb-3'
                                      style={{alignSelf: 'flex-start'}}
                                      variant='contained'
                                      color='primary'
                                      disabled={step != 1} 
                                  >
                                  {step ==1 && <input {...getInputProps()} /> }
                                    Charger le fichier
                              </Button>
                              </div>
                    <Button
                          className='text-white mt-3 mb-3'
                          variant='contained' 
                          style={{alignSelf: 'flex-end'}}
                          color= 'primary' 
                          disabled={step != 2} 
                          type="submit" 
                          onClick={()=>{draft()}}
                      >
                        Enregistrer le document
                    </Button>
          </div>
          <div style={{paddingInline: '7%'}}>
          <Stepper step={step}>
            <Step></Step>
            <Step></Step>
            <Step>

            </Step>
          </Stepper>
          </div>
{step ==0 &&          <div className='pl-20 pr-20 pt-10 m-auto'>
            <SimpleCard>
                <Typography className='mb-6 ml-2'>
                    <h4>Choisir une lettre pour télécharger le fichier du définitions:</h4>
                </Typography>
            {
                letters && letters.map(letter=>
                   <Fab color={letter.status == 'Valide' ? 'primary' : 'secondary'} aria-label="add" onClick={() => (incrementStep(), setLetter(letter.lettre))} href={'http://13.36.215.163:8000/api/administration/download_lot/'+letter.lettre+'/'} className='m-2'>
                        <div>{letter.lettre}</div>
                    </Fab>
                )        
            }
            </SimpleCard>
            </div>}
          <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>
    </div>
      </div>
    )
}