import fetch from 'cross-fetch'
import React from 'react'
import { TextField, CircularProgress, Chip } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { SimpleCard } from 'app/components'

export default function DomaineModify({value , oldValue ,setValue}) {
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
            const Codes = await response.json()

            if (active) {
                setOptions(
                    Codes.Domaines
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

    return (
        <div style={{display: 'flex' ,flexDirection: 'row', width: '100%'}}>
    <div style={{width: '50%', marginInline: '0.5%'}}>
        <SimpleCard title='Nouvelle Version'>
        <Autocomplete
            multiple
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            // inputValue= {value}
            onChange={(event, newval )=> setValue(newval.map(val => (val.code + ' (' + val.super + ')')))}
            getOptionSelected={(option, value) => option.code === value.code}
            getOptionLabel={(option) => option.code + " - " + option.super}
            options={options}
            loading={loading}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option.code}
                        {...getTagProps({ index })}
                    />
                ))
            }
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
        </div>
        <div style={{width: '50%', marginInline: '0.5%'}}>
        <SimpleCard title='Version en cours'>
            <TextField
                value={oldValue}
                variant='outlined'
                className='w-full'
                disabled
            >

            </TextField>
        </SimpleCard>
        </div>
        </div>
    )
}
