import fetch from 'cross-fetch'
import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import images from 'dictionnaireImages/images'
import { useHistory, useLocation } from 'react-router-dom'

export default function MainSearchBar({handleSearch}) {
    const [open, setOpen] = React.useState(false)
    const [defs, setDefs] = React.useState([])
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('');
    const history = useHistory()
    let location = useLocation();

    React.useEffect(() => {
        setLoading(true)
        ;(async () => {
            const response = await fetch(
                `http://13.36.215.163:8000/api/elastic/search/?titre=${inputValue}`
            ).finally(() => {setLoading(false)})
            const defs = await response.json()
                setDefs(defs)
        })()

    }, [inputValue,location.pathname])

    React.useEffect(() => {
        if (!open) {
            setDefs([])
        }
    }, [open])

    return (
        <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
            <img src={images.logoDicMaxi} alt="" className='m-auto'/>
            <div className=' m-auto' style={{width: '40%',transform: 'translate(0px, 100%)'}}>
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
              onChange= {(event, newval) => handleSearch(newval && newval.titre)}
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
    )
}
