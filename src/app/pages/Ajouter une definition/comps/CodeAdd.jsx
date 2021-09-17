import fetch from 'cross-fetch'
import React from 'react'
import { TextField, CircularProgress, Chip } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { SimpleCard } from 'app/components'

export default function CodeAdd({value , setValue}) {
    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const loading = open && options.length === 0

    React.useEffect(() => {
        let active = true

        if (!loading) {
            return undefined
        }

        ;(async () => {
            const response = await fetch(
                'http://13.36.215.163:8000/api/administration/get_domaine_list/'
            )
            const codes = await response.json()
            console.log('cntr',codes.Domaines)

            if (active) {
                setOptions(
                    codes.Domaines
                )
            }
        })()
         console.log("OPTIONSSS",options)
        return () => {
            active = false
        }
    }, [loading])

    React.useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    console.log("INPUT VALUE", value)

    return (
        <div style={{width: '100%'}}>
        <SimpleCard>
        <Autocomplete
            multiple
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            onChange={(event, newval )=>  setValue(newval.map(val => (val.code + ' (' + val.super + ')')))}
            getOptionSelected={(option, value) => option.code === value.code}
            getOptionLabel={(option) => option.code + " - " +option.super}
            options={options}
            loading={loading}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option.code + " - " + option.super}
                        {...getTagProps({ index })}
                    />
                ))
            }
            noOptionsText = 'Aucun code'
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Liste des domaines"
                    fullWidth
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
        </SimpleCard>
        {value.map(val => <div className='m-2'><SimpleCard>
            {val}
        </SimpleCard></div>)}
        </div>
    )
}
