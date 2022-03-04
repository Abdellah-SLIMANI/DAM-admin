import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import SimpleCard from 'app/components/cards/SimpleCard'


export default function DateModify({label,value,setValue,oldValue}) {
    return (
        <>
            <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
                <div style={{width: '50%' ,marginInline: '0.5%'}}>
                    <SimpleCard title="Nouvelle Version" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                id="mui-pickers-date"
                                label={label}
                                format="MM/dd/yyyy"
                                value={value}
                                onChange={setValue}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />         
                        </MuiPickersUtilsProvider>     
                    </SimpleCard>
                </div>
                <div style={{width: '50%' ,marginInline: '0.5%'}}>
                    <SimpleCard title="Version en cours" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                readOnly={true}
                                margin="normal"
                                id="mui-pickers-date"
                                label={label}
                                format="MM/dd/yyyy"
                                value={oldValue}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />         
                        </MuiPickersUtilsProvider>     
                    </SimpleCard>
                </div>
            </div>
        </>
    )
}
