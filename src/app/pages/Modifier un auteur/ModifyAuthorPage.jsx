import React, { useEffect, useState,useRef } from 'react'
import { Button,CircularProgress,Typography} from '@material-ui/core'
import axios from 'axios'
import {  useHistory, useLocation } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import {useDropzone} from 'react-dropzone';
import useAuth from 'app/hooks/useAuth';
import { Breadcrumb } from 'app/components'
import SimpleCard from 'app/components/cards/SimpleCard';
import PreviewContent from 'app/pages/Components/PreviewContent';
import {
  Stepper,
  Step,
  useStepper,
} from "react-progress-stepper";
import { mapAuthorProps } from '../Utils';


export default function ModifyDefTxtEdit() {
    const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [oldContent, setOldContent] = useState({})
    const [loadingB, setLoadingB] = useState(false)
    const [word,setWord] = useState('')
    const {user} = useAuth()
    const history = useHistory();
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
    const previewWordRef = useRef(null)
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,} = useDropzone({
        accept: ['.doc', '.docx'],
        accept: ['.doc', '.docx','/images*'],
        onDrop: acceptedFiles => {
          SubmitFile(acceptedFiles);
        }
      });

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const lastLocation = useLastLocation()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    lastLocation && localStorage.setItem('LastPath',lastLocation.pathname);
    const previousPath = localStorage.getItem('LastPath');
    const url = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/auteur/?nom=' : 'http://13.36.215.163:8000/api/elastic/auteur/?nom='
    const putUrl = (previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord") ? 'http://13.36.215.163:8000/api/administration/auteur/'+oldContent.id+'/' : 'http://13.36.215.163:8000/api/administration/auteur/'

    function func(res) {
            if((previousPath == "/Tableaux-de-bord/" || previousPath == "/Tableaux-de-bord")){
                res && res.data.results.find((word) => {
                    setOldContent(word)
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.nom === query.get('nom')){
                        setOldContent(word)
                    }
                })
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

    function draft(){
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        const role = user.role;
        const actionChecker = oldContent.action
        let data = {
                "elastic_id" : oldContent.elastic_id ? oldContent.elastic_id : "",
                "action": actionChecker ? actionChecker : (previousPath.includes('modifier-un-auteur') ? "Modification" : "Creation"),
                'created_by': user.id,
                'status': 'brouillon',
                'data': previewWord
        }
        if(previousPath.includes('modifier-un-auteur')) {
            axios.post(putUrl, data ,config)
            .then(res => res.statusText == "Created" || res.status == 200 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Error',res))
            .catch(e => console.log("Error while Posting data",e))
        }else {
            axios.put(putUrl, data ,config)
            .then(res => (
                res.status == 200 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Response',res),
                console.log("RESSSSS",res)
            ))
        }
    }

    console.log("THE URL SEAESHED AT ", url+query.get('nom'))
    useEffect(() => {
         axios.get(url+query.get('nom'), {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(response => (func(response)))
    }, [])

    const SubmitFile = (acceptedFilesProp) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        console.log("DATA SENT ON FILE",data.get('data'))
        axios.post("http://13.36.215.163:8000/api/administration/upload_auteur/"+acceptedFilesProp[0].name+ "/", data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFilesProp[0].type
              }
          })
            .then(res => (setPreviewWord(res.data)))
      }

      const getDownloadURL = () =>(
        oldContent.elastic_id ? 'http://13.36.215.163:8000/api/administration/download_auteur/' + oldContent.elastic_id + '/?db=elastic' : 'http://13.36.215.163:8000/api/administration/download_auteur/' + oldContent.id + '/?db=postgre'
      )

      console.log('OLD CONTENT', oldContent)

    return (
        <div className = 'adminPageContainer p-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des auteurs', path: '/tableaux-de-bord-auteurs' },
                        { name: 'Modifier un auteur' },
                    ]}
                />
           <div className="pr-20 pl-20 pt-10 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
                              <Button
                                  className='text-white mt-3 mb-3'
                                  style={{alignSelf: 'flex-start'}}
                                  variant='contained'
                                  disabled={step != 0}
                                  color= 'primary'
                                  href={getDownloadURL()}
                                  target='_blank'
                                  onClick={() => incrementStep()}
                              >
                                {loadingS &&<CircularProgress size={24}></CircularProgress>} Télécharger le fichier
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
                        Enregistrer l'auteur
                    </Button>
                    
          </div>
          <Stepper step={step}>
            <Step></Step>
            <Step></Step>
            <Step>

            </Step>
          </Stepper>
          <div className="mt-3 mb-3 pl-20 pr-20">
              <div className='flex-column'>
                
                  {               
                  oldContent &&   <div className='mb-5'>
                    <SimpleCard>
                    <Typography variant="title" style={{display:'inline-flex'}}>
                            <h4>Aperçu de l'auteur en cours</h4>{' '}
                          </Typography>
                          <>
                        <div>
                            {
                                Object.keys(mapAuthorProps).map((key) =>  

                                {
                                    if(key === mapAuthorProps[key].name)
                                        return <div style={{fontSize: '16px'}}><span style={{fontStyle: 'italic'}}>{mapAuthorProps[key].label + " : "}</span><span >{oldContent[key]}</span><br /></div>
                                        
                                }
                                )
                            }
                        </div>
                        </>
                    </SimpleCard>
                  </div>
                  }
                  {
                    previewWord && 
                 <div ref={previewWordRef}>
                    <SimpleCard>
                      <Typography variant="title" style={{display:'inline-flex'}}>
                            <h4>Aperçu de l'auteur actuel</h4>{' '}
                          </Typography>
                          <>
                        <div>
                            {
                                Object.keys(mapAuthorProps).map((key) =>  

                                {
                                    if(key === mapAuthorProps[key].name)
                                        return <div style={{fontSize: '16px'}}><span style={{fontStyle: 'italic'}}>{mapAuthorProps[key].label + " : "}</span><span >{previewWord[key]}</span><br /></div>
                                }
                                )
                            }
                        </div>
                        </>
                    </SimpleCard>
                  </div>
                  }
              </div>
          </div>
          <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>
    </div>
        </div>
    )
}
