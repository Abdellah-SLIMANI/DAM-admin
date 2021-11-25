import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Button, Card,CircularProgress,Typography} from '@material-ui/core'
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
  StepNumber,
  StepTitle,
  StepStatus,
  StepDescription
} from "react-progress-stepper";
import '../../Ajouter une definition/comps/AddDefComp.css'

export default function ModifyDefTxtEdit() {
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [oldContent, setOldContent] = useState({})
    const [loadingB, setLoadingB] = useState(false)
    const [word,setWord] = useState('')
    const {user} = useAuth()
    const history = useHistory();
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
                        console.log("WORD INSIDE POSTGres",word)
                        setOldContent(word.data)
                        setWord(word)
                    }
                })
            }
            else{
                res && res.data.find((word) => {
                    if(word.titre === query.get('titre')){
                        console.log("WORD INSIDE Elastic",word)
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
    }, [])

    //************************************************************************************************************/
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

      console.log("PREVIEW WORD",previewWord)
      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

      const SubmitFile = (acceptedFilesProp) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        console.log("DATA SENT ON FILE",data.get('data'))
        axios.post("http://13.36.215.163:8000/api/administration/upload/"+acceptedFilesProp[0].name+ "/", data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFilesProp[0].type
              }
          })
            .then(res => (setPreviewWord(res.data)))
      }

    const getDownloadURL = () =>(
      oldContent.id ? 'http://13.36.215.163:8000/api/administration/download/' + oldContent.id + '/?db=elastic' : 'http://13.36.215.163:8000/api/administration/download/' + word.id + '/?db=postgre'
    )
    return (
        <div className='flex-column'>
        <div className="pr-20 pl-20 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
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
                                  <input {...getInputProps()} />
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
                        Enregistrez la définition
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
                            <h4>Aperçu de la définition en cours</h4>{' '}
                          </Typography>
                        <PreviewContent selectedWord={oldContent}/>
                    </SimpleCard>
                  </div>
                  }
                  {
                    previewWord && 
                 <div ref={previewWordRef}>
                    <SimpleCard>
                      <Typography variant="title" style={{display:'inline-flex'}}>
                            <h4>Aperçu de la définition actuel</h4>{' '}
                          </Typography>
                        <PreviewContent selectedWord={previewWord}/>
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
