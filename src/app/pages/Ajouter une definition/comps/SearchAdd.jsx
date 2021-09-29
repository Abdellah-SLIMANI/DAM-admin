import fetch from 'cross-fetch'
import React, { useState } from 'react'
import { TextField, CircularProgress, Snackbar } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHistory, useLocation } from 'react-router-dom'
import { SimpleCard } from 'app/components'
import { isContainingObject } from 'app/pages/Utils'


export default function SearchAdd({value,setValue}) {
    const [open, setOpen] = React.useState(false)
    const [defs, setDefs] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const [inputValue, setInputValue] = React.useState('');

    console.log(value)
   function handleSearch(word){
       if(word != null){
            setValue([...value, {id:word.id,titre:word.titre}])
       }
    }

    React.useEffect(() => {
        console.log("VALUEEEEE",value)
        ;(async () => {
            const response = await fetch(
                `http://13.36.215.163:8000/api/elastic/search/?titre=${inputValue}`
            ).finally(() => {setLoading(false)})
            const defs = await response.json()
                setDefs(defs)
        })()

    }, [inputValue])
    return (     
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
            //   value={value}
              onChange= {(event, newval) => handleSearch(newval)}
              getOptionSelected={(def,value) => (def.titre ==+ value.titre) }
              getOptionLabel={(def) => def.titre || "" }
              options={defs}
              loading={loading}
              noOptionsText = 'Aucune définition'
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Saisir le titre de la définition"
                      fullWidth
                      className ='bg-white'
                      variant="outlined"
                      InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                              <React.Fragment>
                                  {params.InputProps.endAdornment}
                              </React.Fragment>
                          ),
                      }}
                  />
              )}
          />
            </div>
            {value.map(val => <div className='m-2'>
        <SimpleCard>
            {val.titre}
        </SimpleCard></div>)}
        </div>
    )
}
