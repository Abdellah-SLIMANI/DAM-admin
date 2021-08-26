import { TextField } from '@material-ui/core'
import { SimpleCard } from 'app/components'
import React from 'react'

export default function ModifyTxt({value, oldValue, setValue}) {
    return (
        <div style={{display: 'flex' ,flexDirection: 'row', width: '100%'}}>
        <div style={{width: '50%' ,marginInline: '0.5%'}}>
            <SimpleCard className='p-5' title='Nouvelle version'>
                <TextField
                    value={value}
                    variant='outlined'
                    defaultValue = {Date().getFullYear()}
                    onChange={newval => setValue(newval)}
                >

                </TextField>
            </SimpleCard>
        </div>
        <div style={{width: '50%', marginInline: '0.5%'}}>
            <SimpleCard className= 'p-5' title= 'Version en cours'>
            <TextField
                value={oldValue}
                variant='outlined'
                disabled
            >

            </TextField>
            </SimpleCard>
        </div>
    </div>
    )
}
