import { TextField } from '@material-ui/core'
import { SimpleCard } from 'app/components'
import React from 'react'

export default function ModifyTxt({value, oldValue, setValue, option}) {
    console.log(value,oldValue)
    return (
        <div style={{display: 'flex' ,flexDirection: 'row', width: '100%',margin: '100px'}}>
        <div style={{width: '50%' ,marginInline: '0.5%'}}>
            <SimpleCard className='p-5' title='Nouvelle version'>
                <TextField
                    value={value.toString()}
                    variant='outlined'
                    defaultValue = { option && new Date().getFullYear()}
                    onChange={(event,newval) => setValue(newval)}
                >

                </TextField>
            </SimpleCard>
        </div>
        <div style={{width: '50%', marginInline: '0.5%'}}>
            <SimpleCard className= 'p-5' title= 'Version en cours'>
            <TextField
                defaultValue= {oldValue}
                variant='outlined'
                disabled
            >
            </TextField>
            </SimpleCard>
        </div>
    </div>
    )
}
