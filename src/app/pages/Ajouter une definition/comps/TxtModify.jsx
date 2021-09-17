import { SimpleCard } from 'app/components'
import React from 'react'
import JoditEditor from "jodit-react";
import { Button } from '@material-ui/core';
import {config} from '../../Utils'

export default function TxtModify({value,setValue,fieldName}) {
    return (
        <div style={{ width: '100%'}}>
            <SimpleCard className='p-5' style={{width: '100%', marginBottom: '2rem'}}>
                <JoditEditor
                    value={value}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setValue({[fieldName]: newContent})} // preferred to use only this option to update the content for performance reasons
                />
            </SimpleCard>          
    </div>
    )
}
