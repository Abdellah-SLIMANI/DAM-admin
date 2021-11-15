import React, { useEffect, useMemo, useState } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import './AddDefComp.css'
import {useDropzone} from 'react-dropzone';
import SimpleCard from 'app/components/cards/SimpleCard';
import PreviewContent from 'app/pages/Components/PreviewContent';
import axios from '../../../../axios'
import useAuth from 'app/hooks/useAuth';
import { useHistory } from 'react-router';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
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
    const [files, setFiles] = useState([])
    const [loadingS,setLoadingS] = useState(false)
    const [previewWord, setPreviewWord] = useState()
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

      function soummetre(){
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
            .then(res => setPreviewWord(res.data))
      }
      console.log('FILES',acceptedFiles, files)
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
            <div>
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
                    className='text-white ml-3 mt-3 mb-3 bg-light-dark'
                    style={{alignSelf: 'flex-start'}}
                    variant='contained'
                    disabled={loadingS} 
                    type="submit" 
                    onClick={()=>{SubmitFile()}}
                >
                {loadingS &&<CircularProgress size={24}></CircularProgress>} Soumettre le fichier
            </Button>
            </div>
          <Button
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
          </div>
            <div className="mt-3 mb-3 pl-20 pr-20">
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
            </div>
            <div className="mt-3 mb-3 pl-20 pr-20">
            {
                previewWord && 
                    <SimpleCard title={'Aperçu de la définition'}>
                        <PreviewContent selectedWord={previewWord}/>
                    </SimpleCard>
            }
            </div>
        </div>
    )
}
