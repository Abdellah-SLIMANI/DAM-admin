import fetch from 'cross-fetch'
import React, { useEffect, useState } from 'react'
import { TextField, CircularProgress, Snackbar, Icon } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHistory, useLocation } from 'react-router-dom'
import { SimpleCard } from 'app/components'

export default function ModifySearchArray({value,setValue,oldValue}) {
    const [open, setOpen] = React.useState(false)
    const [defs, setDefs] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('');

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

    }, [inputValue,value])

    console.log("VALUE", value, '\nOld VAlue',oldValue)
    return (     
        <>
        <div className='searchContainer m-auto p-5 d-flex' >
            <div className=' m-auto w-full'>
            <SimpleCard title='Nouvelle Version'>
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
          </SimpleCard>
            </div>
                <div className=' m-auto w-full'>
                <SimpleCard title='Version en cours'>
                <TextField
                className='w-full'
                    value={Array.isArray(oldValue) && oldValue.map(word => word.titre + "-")}
                    variant='outlined'
                    disabled
                    />
                    </SimpleCard>
                </div>

        </div>
        <ShowWords value={value}/>
        </>
    )
}

const ShowWords = ({value}) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    function removeWord(word){
        const index = value.indexOf(word)
        if(index > -1){
            value.splice(index, 1)
        }
        forceUpdate()
    }

    useEffect(() => {
    }, [value])
    return(
        <>
        {value.map(val => <div className='m-2'>
        <SimpleCard>
            <div className='d-flex' style={{justifyContent: 'space-between'}}>
                <div>{val.titre}</div>
                <div onClick={() => removeWord(val)} style={{cursor:'pointer'}}><Icon>highlight_off</Icon></div>
            </div>
        </SimpleCard></div>)}
        </>
    )
}