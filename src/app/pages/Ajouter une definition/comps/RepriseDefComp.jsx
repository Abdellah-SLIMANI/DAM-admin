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

export default function RepriseDefComp() {
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
        axios.post("administration/valider_reprise/", previewWord )
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Error',res))
        .catch(res => console.log("Error while Posting data",res))
        .finally(setLoadingS(false))
    }

    
      const SubmitFile = (acceptedFilesProp) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        console.log("DATA SENT ON FILE",data.get('data'))
        axios.post("http://51.68.80.15:8000/api/administration/upload_reprise/"+acceptedFilesProp[0].name+ "/", data.get('data') ,
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
        <div {...getRootProps()}>
                              <Button
                                      className='text-white ml-3 mt-3 mb-3'
                                      style={{alignSelf: 'flex-start'}}
                                      variant='contained'
                                      color='primary'
                                      disabled={step != 0} 
                                  >
                                  {step == 0 && <input {...getInputProps()} /> }
                                    Charger le fichier
                              </Button>
                              </div>

              <Button
                          className='text-white mt-3 mb-3'
                          variant='contained' 
                          style={{alignSelf: 'flex-end'}}
                          color= 'primary' 
                          disabled={step != 1} 
                          type="submit" 
                          onClick={()=>{soummetre()}}
                      >
                        Valider
                    </Button>
                    
          </div>
          <Stepper step={step}>
            <Step></Step>
            <Step></Step>
          </Stepper>
            <div className="mt-3 mb-3 pl-20 pr-20">
            {/* {
                previewWord && step == 1 && previewWord.map(word => (
                    console.log("Word",word),
                    <SimpleCard>
                        <PreviewContent selectedWord={word}/>
                    </SimpleCard>
                ))
            } */}
                       {
                    previewWord && step == 1 && <>
                    <Typography variant="title" style={{display:'inline-flex'}} className='mt-5'>
                            <h4>Aperçu des définitions du fichier</h4>{' '}
                    </Typography>
                    {previewWord.map(def =>
                    <div className='mt-2 mb-2'>    
                    <SimpleCard>
                        <PreviewContent selectedWord={def}/>
                    </SimpleCard>
                    </div>
                    )}
                    </>
                  }
            </div>
            <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>

    </div>
        </div>
    )
}
