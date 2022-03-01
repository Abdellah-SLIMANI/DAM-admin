import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, CircularProgress,Typography } from '@material-ui/core'
import {useDropzone} from 'react-dropzone';
import SimpleCard from 'app/components/cards/SimpleCard';
import PreviewContent from 'app/pages/Components/PreviewContent';
import axios from '../../../../axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router';
import {
  Stepper,
  Step,
  useStepper,
} from "react-progress-stepper";
import './AddDefComp.css'

export default function AddDefComp() {
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
    const {user} = useAuth()
    const history = useHistory();
    const {
        acceptedFiles,
        getRootProps,
        getInputProps} = useDropzone({
        accept: ['.doc', '.docx','/images*'],
        onDrop: acceptedFiles => {
          SubmitFile(acceptedFiles);
        },
      });

      function soummetre(){
      incrementStep()
      setLoadingS(true)
      let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
        let data = {
            "titre": previewWord.titre,
            'status': 'brouillon',
            'created_by': user.id,
            'data': previewWord
        }

        axios.post("administration/article/", data , config )
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Error',res))
        .catch(res => console.log("Error while Posting data",res))
        .finally(setLoadingS(false))
    }

    
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
      console.log('FILES',acceptedFiles, files)

      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    console.log("PREVIEW WORD",previewWord)

    return(
        <div className='flex-column mt-10'>
        <div className="pr-20 pl-20 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
                              <Button
                                  className='text-white mt-3 mb-3'
                                  style={{alignSelf: 'flex-start'}}
                                  variant='contained'
                                  disabled={step != 0}
                                  color= 'primary'
                                  href='http://13.36.215.163:8000/api/administration/download_template/'
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
                        Enregistrer la définition
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
                            <h4>Aperçu de la définition</h4>{' '}
                          </Typography>
                        <PreviewContent selectedWord={previewWord}/>
                    </SimpleCard>
            }
            </div>
            <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>

    </div>
        </div>
    )
}
