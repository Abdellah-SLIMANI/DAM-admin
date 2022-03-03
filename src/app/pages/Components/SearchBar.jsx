import fetch from 'cross-fetch'
import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete ,  { createFilterOptions }from '@material-ui/lab/Autocomplete'
import { useHistory, useLocation } from 'react-router-dom'


const filter = createFilterOptions();

export default function AsyncAutocomplete(props) {
    const [open, setOpen] = React.useState(false)
    const [defs, setDefs] = React.useState([])
    const [value, setValue] = React.useState("")
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
    React.useEffect(() => {
        if(inputValue.includes('Trouver des suggestions du')) 
            return setOpen(true)
    }, [value])
    return (
        <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
            <div className=' m-auto'>
                <Autocomplete
                    value={value}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    open={open}
                            onOpen={() => {
                                setOpen(true)
                            }}
                            onClose={() => {
                                setOpen(false)
                            }}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                        setValue({
                            titre: newValue,
                        });
                        } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            titre: newValue.inputValue,
                        });
                        } else {
                        setValue(newValue);
                        props.handleSearch(newValue)
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.titre);
                        if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            titre: `Trouver des suggestions du "${inputValue}"`,
                        });
                        }

                        return filtered;
                    }}
                    options={defs}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                        return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                        return option.titre;
                        }
                        // Regular option
                        return option.titre;
                    }}
                    noOptionsText = {props.noOptionsText}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={props.label}
                                    fullWidth
                                    className ='bg-white'
                                    variant='outlined'
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
