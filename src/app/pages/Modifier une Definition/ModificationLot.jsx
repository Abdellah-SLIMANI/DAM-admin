import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Button, Card,CircularProgress,Fab,Grid,Icon,IconButton,Table,TableCell,TableHead,TableRow,Typography} from '@material-ui/core'
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
import MUIDataTable from 'mui-datatables';

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
    console.log("LETTER,",letter)

    function draft(){
        setLoadingB(true)
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
            axios.post('http://13.36.215.163:8000/api/administration/valider_lot/'+letter+'/', previewLot ,config)
            .then(res => (console.log("RESPONSE",res)))
            .finally(()=>(
                history.push(`/Tableaux-de-bord/?tableaux=definitions`),
                setLoadingB(false)
            ))
        
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
    const [previewLot, setPreviewLot] = useState()
    const [sousLot, setSouslot] = useState()
    const [sousLotNbr, setSousLotNbr] = useState()
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

      const getSousLot = (letter) => {
        setLetter(letter)
        incrementStep()
        axios.get("http://13.36.215.163:8000/api/administration/get_sous_lots/"+letter ,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        })
        .then(res=> (console.log(res.data.sous_lots), setSouslot(res.data.sous_lots)))
        .finally(console.log("SOUSLOTS",sousLot))
      }

      const SubmitFile = (acceptedFilesProp,letter) => {
        incrementStep()
        let data = new FormData();
        data.append('data', acceptedFilesProp[0])
        axios.post("http://13.36.215.163:8000/api/administration/upload_lot/"+letter+ "/"+ sousLotNbr, data.get('data') ,
            { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': acceptedFilesProp[0].type
              }
          })
            .then(res => setPreviewLot(res.data))
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
                              <Button
                                  className='text-white ml-8 mt-3 mb-3'
                                  style={{alignSelf: 'flex-start'}}
                                  variant='contained'
                                  disabled={step != 1}
                                  color= 'primary'
                                  target='_blank'
                                  
                              >
                                {loadingS &&<CircularProgress size={24}></CircularProgress>} Choix du sous lot
                              </Button>
                              <div {...getRootProps()}>
                              <Button
                                      className='text-white ml-10 mt-3 mb-3'
                                      style={{alignSelf: 'flex-start'}}
                                      variant='contained'
                                      color='primary'
                                      disabled={step != 2} 
                                  >
                                  {step ==2 && <input {...getInputProps()} /> }
                                    Charger le fichier
                              </Button>
                              </div>
                    <Button
                          className='text-white mt-3 mb-3'
                          variant='contained' 
                          style={{alignSelf: 'flex-end'}}
                          color= 'primary' 
                          disabled={step != 3} 
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
            <Step></Step>
          </Stepper>
          </div>
        {step ==0 &&          <div className='pl-20 pr-20 pt-10 m-auto'>
            <SimpleCard>
                <Typography className='mb-6 ml-2'>
                    <h4>Choisir une lettre pour télécharger le fichier du définitions:</h4>
                </Typography>
            {
                letters && letters.map(letter=>
                   <Fab color={letter.status == 'Valide' ? 'primary' : 'secondary'} aria-label="add" onClick={() =>  getSousLot(letter.lettre)} className='m-2'>
                        <div>{letter.lettre}</div>
                    </Fab>
                )        
            }
            </SimpleCard>
            </div>}
            {
              step == 1 && 
              <div className='mt-5 pt-5 pl-10 pr-10'>
                <MUIDataTable 
                  title = {
                    <Typography className='mb-6  mt-10'>
                    <h4>Choisir un sous-lot pour télécharger le fichier du définitions:</h4>
                </Typography>
                  }
                  options= {{
                    count: sousLot && sousLot.length,
                    print: false,
                    download: false,
                    selectableRows: 'none',
                    jumpToPage: true,
                    search: false,
                    filter: false,
                    viewColumns: false,
                    textLabels: {
                      body: {
                          noMatch: "Désolé, aucun fichier correspondant n'a été trouvé"
                      },
                        pagination: {
                          rowsPerPage: "Fichier par page ",
                          jumpToPage: 'Page'
                        },
                  }
                  }}
                  columns={[
                    {
                      name: "id",
                      label: "Numero du fichier",
                      options: {
                       filter: false,
                       sort: true,
                      }
                    },
                    {
                      name: "traite",
                      label: "Définitions traitées",
                      options: {
                       filter: false,
                       sort: true,
                      }
                    },
                    {
                      name: "restant",
                      label: "Définitions restantes",
                      options: {
                       filter: false,
                       sort: true,
                      }
                    },
                    {
                      name: "premiere",
                      label: "Première définition du fichier",
                      options: {
                       filter: false,
                       sort: true,
                      }
                    },
                    {
                      name: "derniere",
                      label: "Dernière définition du fichier",
                      options: {
                       filter: false,
                       sort: true,
                      }
                    },
                    {
                      name: "a",
                      label: "Télécharger",
                      options: {
                       filter: false,
                       sort: true,
                       customBodyRenderLite: (dataIndex) => {
                        return ( 
                            <div className='inline-block'>
                            <IconButton onClick={() => (incrementStep(),setSousLotNbr(sousLot[dataIndex].id))} href={"http://13.36.215.163:8000/api/administration/download_lot/"+letter+'/'+ sousLot[dataIndex].id}>
                            <Icon color='primary'>download</Icon>
                        </IconButton>
                        </div>
                        )
                      }
                      }
                    }
                  ]}
                  data={sousLot && sousLot}
                />
              </div>
            }
            <div>
            {
                    previewLot && <>
                    <Typography variant="title" style={{display:'inline-flex'}} className='mt-5'>
                            <h4>Aperçu des définitions du fichier</h4>{' '}
                    </Typography>
                    {previewLot.map(def =>
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