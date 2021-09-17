import React from 'react'
import JoditEditor from "jodit-react";
import { Button, Card } from '@material-ui/core';
import SimpleCard from 'app/components/cards/SimpleCard';
import RedoIcon from '@material-ui/icons/Redo';
import { ReadOnly, config } from 'app/pages/Utils';

export default function ModifyBlock({value , setValue ,oldValue,fieldName}) {
    console.log("VALUE INSIDE",value,oldValue)
    return (
    <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
        <div style={{width: '50%' ,marginInline: '0.5%'}}>
            <SimpleCard className='p-5' title='Nouvelle version'>
                <JoditEditor
                    value={value} 
                    config={config}
                    tabIndex={1} 
                    onBlur={(newContent) => setValue({[fieldName]: newContent})}
                />
            </SimpleCard>
        </div>
        <div style={{width: '50%', marginInline: '0.5%'}}>
            <SimpleCard className= 'p-5' title= 'Version en cours'>
                <JoditEditor
                    value={oldValue}
                    config={ReadOnly}
                    tabIndex={1}
                />
            </SimpleCard>
            <Button onClick={()=>{setValue({[fieldName]: oldValue})}} style={{transform: 'translate(-70%, 0)', background: '#eee', margin: '1%'}}><RedoIcon style={{transform: 'rotate(180deg)'}}></RedoIcon></Button>
        </div>
    </div>
    )
}
