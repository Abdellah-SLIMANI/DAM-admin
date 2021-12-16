import React, { useState } from 'react'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import { Button, Card, CircularProgress,Typography } from '@material-ui/core'
import {useDropzone} from 'react-dropzone';
import axios from 'axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from 'app/components';
import SimpleCard from 'app/components/cards/SimpleCard';
import PreviewContent from 'app/pages/Components/PreviewContent';
import {
    Stepper,
    Step,
    useStepper,
  } from "react-progress-stepper";
import { mapAuthorProps } from '../Utils';



export default function AddDefComp() {
    const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
    const {user} = useAuth()
    const history = useHistory();
    const {
        getRootProps,
        getInputProps} = useDropzone({
        accept: ['.doc', '.docx','/images*'],
        onDrop: acceptedFiles => {
          SubmitFile(acceptedFiles);
        },
      });

    function soummetre(){
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        let data = {
            "action": "Creation",
            "status": "brouillon",  
            'created_by': user.id,
            'data': previewWord
        }

        axios.post("http://13.36.215.163:8000/api/administration/auteur/", data ,config)
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=auteurs`) : window.alert('Server Error',res))
    }

    const SubmitFile = (acceptedFilesProp) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        axios.post("http://13.36.215.163:8000/api/administration/upload_auteur/"+acceptedFilesProp[0].name+ "/", data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFilesProp[0].type
              }
          })
            .then(res => (setPreviewWord(res.data)))
      }



    return (
        <div className = 'adminPageContainer p-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des auteurs', path: '/tableaux-de-bord-auteurs' },
                        { name: 'Ajouter un auteur' },
                    ]}
                />
                        <div className="pr-20 pl-20 pt-10 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
                              <Button
                                  className='text-white mt-3 mb-3'
                                  style={{alignSelf: 'flex-start'}}
                                  variant='contained'
                                  disabled={step != 0}
                                  color= 'primary'
                                  href='http://13.36.215.163:8000/api/administration/download_auteur_template/'
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
                          onClick={()=>{soummetre()}}
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
            {
                previewWord && step == 2 &&
                    <SimpleCard>
                          <Typography variant="title" style={{display:'inline-flex'}}>
                            <h4>Aperçu de l'auteur</h4>{' '}
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
            }
            </div>
            <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>

    </div>
        </div>
    )
}
