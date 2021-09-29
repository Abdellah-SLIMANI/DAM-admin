import React from 'react'
import JoditEditor from "jodit-react";
import { Button, Card } from '@material-ui/core';
import SimpleCard from 'app/components/cards/SimpleCard';
import RedoIcon from '@material-ui/icons/Redo';
import { ReadOnly, config } from 'app/pages/Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ModifyBlock({value , setValue ,oldValue,fieldName}) {
    console.log("VALUE INSIDE",value,oldValue)
    return (
    <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
        <div style={{width: '50%' ,marginInline: '0.5%'}}>
            <SimpleCard className='p-5' title='Nouvelle version'>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={value}
                            onBlur={(event,editor) => {setValue({[fieldName]: editor.getData()})}} // preferred to use only this option to update the content for performance reasons
                        />
            </SimpleCard>
        </div>
        <div style={{width: '50%', marginInline: '0.5%'}}>
            <SimpleCard className= 'p-5' title= 'Version en cours'>
            <CKEditor 
                            editor={ClassicEditor}
                            data={oldValue}
                            disabled= {true}
                        />
            </SimpleCard>
            <Button onClick={()=>{setValue({[fieldName]: oldValue})}} style={{transform: 'translate(-70%, 0)', background: '#eee', margin: '1%'}}><RedoIcon style={{transform: 'rotate(180deg)'}}></RedoIcon></Button>
        </div>
    </div>
    )
}
