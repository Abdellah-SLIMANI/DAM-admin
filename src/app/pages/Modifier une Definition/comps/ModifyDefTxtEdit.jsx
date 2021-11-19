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
  

export default function ModifyDefTxtEdit() {
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
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({
        accept: ['.doc', '.docx'],
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
      });


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
          .then(res => (
              setPreviewWord(res.data),
              previewWordRef.current.scrollIntoView()
              ))
    }

    const getDownloadURL = () =>(
      oldContent.id ? 'http://13.36.215.163:8000/api/administration/download/' + oldContent.id + '/?db=elastic' : 'http://13.36.215.163:8000/api/administration/download/' + word.id + '/?db=postgre'
    )
    return (
        <div className='flex-column'>
        <div className="pr-20 pl-20 flex" style={{alignSelf: 'flex-end',width:'100%',justifyContent: 'space-between'}}>
            <div>
            <Button
                className='text-white mt-3 mb-3'
                style={{alignSelf: 'flex-start'}}
                variant='contained' 
                color= 'primary'
                href={getDownloadURL()}
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
                {loadingS &&<CircularProgress size={24}></CircularProgress>} Valider le fichier
            </Button>
            </div>
          <Button
                className='bg-green text-white mt-3 mb-3'
                variant='contained' 
                style={{alignSelf: 'flex-end'}}
                color= 'primary' 
                disabled={loadingS} 
                type="submit" 
                onClick={()=>{draft()}}
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
      </div>
    )
}
