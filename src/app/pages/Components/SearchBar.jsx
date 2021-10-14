import fetch from 'cross-fetch'
import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHistory, useLocation } from 'react-router-dom'

export default function AsyncAutocomplete(props) {
    const [open, setOpen] = React.useState(false)
    const [defs, setDefs] = React.useState([])
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('');
    let location = useLocation();

    React.useEffect(() => {
        setLoading(true)
        ;(async () => {
            const response = await fetch(props.url+inputValue)
                .finally(() => {setLoading(false)})
            const defs = await response.json()
            setDefs(defs)
        })()

    }, [inputValue,location.pathname])

    console.log("URL",props.url+inputValue , defs)

    React.useEffect(() => {
        if (!open) {
            setDefs([])
        }
    }, [open])

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
              value={value}
              onChange= {(event, newval) => (props.handleSearch(newval))}
              getOptionSelected={(def,value) => (def.titre ==+ value.titre) }
              getOptionLabel={(def) => def.titre || "" }
              options={defs}
              loading={loading}
              noOptionsText = {props.noOptionsText}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label={props.label}
                      fullWidth
                      className ='bg-white'
                    //   variant='outlined'
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
