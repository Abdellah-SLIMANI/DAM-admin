import React, { Component } from 'react'
import SearchBar from '../Components/SearchBar'
import { useHistory,useLocation} from 'react-router-dom'
import images from 'dictionnaireImages/images'
import { Breadcrumb } from 'app/components'
import ListeDesAuteurs from './comps/ListeDesAuteurs'
import fetch from 'cross-fetch'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function DeleteElasticDef(){

     const [open, setOpen] = React.useState(false)
     const [authors, setAuthors] = React.useState([])
     const [value, setValue] = React.useState('')
     const [loading, setLoading] = React.useState(false)
     const [inputValue, setInputValue] = React.useState('');
     let location = useLocation();

     function handleSearch(word){
        if(word != null){
         let queryString = "nom=" + word.nom;
         history.push(`/modifier-un-auteur/?${queryString}`);
        }
     }
 
     React.useEffect(() => {
         setLoading(true)
         ;(async () => {
             const response = await fetch('http://13.36.215.163:8000/api/elastic/auteur/?nom='+inputValue)
                 .finally(() => {setLoading(false)})
             const authors = await response.json()
             setAuthors(authors)
         })()
 
     }, [inputValue,location.pathname])
 
     React.useEffect(() => {
         if (!open) {
            setAuthors([])
         }
     }, [open])
     const url = 'http://13.36.215.163:8000/api/elastic/auteur/?nom='
     const history = useHistory()
        return (
            <div>
                <div className='pt-10 pl-10'>
                <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des definitions', path: '/tableaux-de-bord' },
                        { name: 'Supprimer une definition' },
                    ]}
                />
                </div>
                {/* <SearchToDelete /> */}
                <div className='mt-5'>
                    <img src={images.livre} style={{width: '100vw'}}/>
                    <div style={{transform: 'translate(0,-125%)', width: '40%', margin: 'auto'}}>
                    <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
            <div className=' m-auto'>
            <Autocomplete
              open={open}
              onOpen={() => {
                  setOpen(true)
              }}
              onClose={() => {
                  setOpen(false)
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              value={value}
              onChange= {(event, newval) => (handleSearch(newval))}
              getOptionSelected={(author,value) => (author.nom ==+ value.nom) }
              getOptionLabel={(author) => author.nom || "" }
              options={authors}
              loading={loading}
              noOptionsText = 'Aucun auteur'
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Saisir le nom de l'auteur"
                      fullWidth
                      className ='bg-white'
                      variant="outlined"
                      InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                              <React.Fragment>
                                  {loading ? (
                                      <CircularProgress
                                          color="inherit"
                                          size={20}
                                      />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                              </React.Fragment>
                          ),
                      }}
                  />
              )}
          />
            </div>
        </div>
                    </div>
                </div>
                <ListeDesAuteurs />
            </div>
        )
}
