import { SimpleCard } from 'app/components'
import React from 'react'
import JoditEditor from "jodit-react";
import { Button } from '@material-ui/core';
import {config} from '../../Utils'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr.js'

export default function TxtModify({value,setValue,fieldName}) {
    return (
        <div style={{ width: '100%'}}>
            <SimpleCard className='p-5' style={{width: '100%', marginBottom: '2rem'}}>
                <CKEditor 
                    editor={ClassicEditor}
                    defaultlanguage='fr'
                    data={value.toString()}
                    onBlur={(event,editor) => setValue({[fieldName]: editor.getData()})} // preferred to use only this option to update the content for performance reasons
                />
            </SimpleCard>          
    </div>
    )
}
