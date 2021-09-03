import React from 'react'
import JoditEditor from "jodit-react";
import { Button, Card } from '@material-ui/core';
import SimpleCard from 'app/components/cards/SimpleCard';
import RedoIcon from '@material-ui/icons/Redo';

export default function ModifyBlock({value , oldValue ,setValue}) {

    const config = {
		readonly: false, 
        language: "fr",
        resizer: {
            "showSize": true,
            "hideSizeTimeout": 0,
            "min_width": 10,
            "min_height": 10
        },
        useSplitMode: true,
        autofocus: true,
        width: '100%',
	}

    const ReadOnly = {
        readonly: true,
        language: "fr",
        resizer: {
            "showSize": true,
            "hideSizeTimeout": 0,
            "min_width": 10,
            "min_height": 10
        },
        useSplitMode: true,
        autofocus: true,
        width: '100%',
    }

    console.log("TO STRING", value.toString())
    return (
    <div style={{display: 'flex' ,flexDirection: 'row', width: '100%'}}>
        <div style={{width: '50%' ,marginInline: '0.5%'}}>
            <SimpleCard className='p-5' title='Nouvelle version'>
                <JoditEditor
                    value={value} 
                    config={config}
                    tabIndex={1} 
                    onBlur={newContent => setValue(newContent)}
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
            <Button onClick={()=>setValue(oldValue)} style={{transform: 'translate(-70%, 0)', background: '#eee', margin: '1%'}}><RedoIcon style={{transform: 'rotate(180deg)'}}></RedoIcon></Button>
        </div>
    </div>
    )
}
