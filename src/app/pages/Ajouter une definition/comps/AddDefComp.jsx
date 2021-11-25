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
  StepNumber,
  StepTitle,
  StepStatus,
  StepDescription
} from "react-progress-stepper";
import './AddDefComp.css'


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  


export default function AddDefComp() {
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
    const [valider, setValider] = useState(false)
    const {user} = useAuth()
    const history = useHistory();
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({
        accept: ['.doc', '.docx','/images*'],
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
      });
      
      console.log("STEP",step)

      function soummetre(){
        incrementStep()
      setLoadingS(true)
        let data = {
            "titre": previewWord.titre,
            'status': 'brouillon',
            'created_by': user.id,
            'data': previewWord
        }

        axios.post("administration/article/", data )
        .then(res => res.status == 200 || res.status == 201 ? history.push(`/Tableaux-de-bord/?tableaux=definitions`) : window.alert('Server Error',res))
        .catch(res => console.log("Error while Posting data",res))
        .finally(setLoadingS(false))
    }
      const SubmitFile = () => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFiles[0])
        console.log("DATA SENT ON FILE",data.get('data'))
        axios.post("http://13.36.215.163:8000/api/administration/upload/"+acceptedFiles[0].name+ "/", data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFiles[0].type
              }
          })
            .then(res => (setPreviewWord(res.data), setValider(true)))
      }
      console.log('FILES',acceptedFiles, files ,acceptedFiles.length == 0)
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

      const filesPrev = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path}
        </li>
      ));

      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    console.log("PREVIEW WORD",previewWord)

    return(
        <div className='flex-column mt-10'>
        <div className="pr-20 pl-20 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
{step == 0 &&            <div>
            <Button
                className='text-white mt-3 mb-3'
                style={{alignSelf: 'flex-start'}}
                variant='contained' 
                color= 'primary'
                href='http://13.36.215.163:8000/api/administration/download_template/'
                target='_blank'
            >
              {loadingS &&<CircularProgress size={24}></CircularProgress>} Télécharger le fichier
            </Button>
            <Button
                    className='text-white ml-3 mt-3 mb-3'
                    style={{alignSelf: 'flex-start'}}
                    variant='contained'
                    color='primary'
                    disabled={acceptedFiles.length == 0} 
                    type="submit" 
                    onClick={()=>{SubmitFile()}}
                    
                >
                 Valider le fichier
            </Button>
            </div>}
{step == 1 &&          <><Button
                className='bg-green text-white mt-3 mb-3'
                variant='contained' 
                style={{alignSelf: 'flex-end'}}
                color= 'primary' 
                disabled={!previewWord} 
                type="submit" 
                onClick={()=>{soummetre()}}
            >
              {loadingS &&<CircularProgress size={24}></CircularProgress>} Soumettre
          </Button>
           <Button onClick={decrementStep} className='m-10'>Retour</Button>
           </>
           }
          </div>
{step == 0 &&             <div className="mt-3 mb-3 pl-20 pr-20">
            <SimpleCard title={'Importer des fichiers'}>
            <section className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Glissez et déposez des fichiers ici, ou cliquez pour les sélectionner.</p>
            </div>
            <aside style={thumbsContainer}>
                {filesPrev}
            </aside>
            </section>
            </SimpleCard>
            </div>}
            <div className="mt-3 mb-3 pl-20 pr-20">
            {
                previewWord && step == 1 &&
                    <SimpleCard>
                          <Typography variant="title" style={{display:'inline-flex'}}>
                            <h4>Aperçu de la définition</h4>{' '}
                          </Typography>
                        <PreviewContent selectedWord={previewWord}/>
                    </SimpleCard>
            }
            </div>
            <div className='pl-20 pr-20' style={{marginBottom: '10rem'}}>
      <Stepper step={step}>
      <Step>
          <StepTitle>Titre ici</StepTitle>
          <StepStatus textProgress='En cours' textCompleted='Terminé'/>
          <StepDescription>Description ici</StepDescription>
        </Step>
        <Step>
        <StepTitle>Titre ici</StepTitle>
          <StepStatus textProgress='En cours' textCompleted='Terminé' textPending='En attendant'/>
          <StepDescription>Description ici</StepDescription>
        </Step>
      </Stepper>
    </div>
        </div>
    )
}
