import React, { Component } from 'react'
import SearchBar from '../Components/SearchBar'
import { useHistory, useLocation } from 'react-router-dom'
import images from 'dictionnaireImages/images'
import DeleteAuthor from './comps/DeleteAuthors'
import { Autocomplete } from '@material-ui/lab'
import { CircularProgress, TextField } from '@material-ui/core'
import { Breadcrumb } from 'app/components'


export default function DeleteElasticAuthor(){
    const [open, setOpen] = React.useState(false)
    const [authors, setAuthors] = React.useState([])
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('');

    function handleSearch(word){
        if(word != null){
         let queryString = "nom=" + word.nom;
         history.push(`/supprimer-un-auteur/?${queryString}`);
        }
     }
     const history = useHistory()
     let location = useLocation();

     React.useEffect(() => {
        setLoading(true)
        ;(async () => {
            const response = await fetch('http://51.68.80.15:8000/api/elastic/auteur/?nom='+inputValue)
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

        return (
            <div>
                <div className='pt-10 pl-10'>
                <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des auteurs', path: '/tableaux-de-bord' },
                        { name: 'supprimer un auteur' },
                    ]}
                />
                </div>
                <div className='mt-5'>
                    <img src={images.livre} style={{width: '100vw'}}/>
                    <div style={{transform: 'translate(0,-125%)', width: '40%', margin: 'auto'}}>
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
                <DeleteAuthor />
            </div>
        )
}
