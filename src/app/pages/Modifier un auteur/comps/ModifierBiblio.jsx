import { SimpleCard } from 'app/components'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import JoditEditor from "jodit-react";
import { Button, TextField } from '@material-ui/core';
import { ReadOnly, config } from 'app/pages/Utils';
import TxtModify from 'app/pages/Ajouter une definition/comps/TxtModify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function ModifierBiblio({value,setValue,type,oldValue}) {
    const setActualItem = (item,index) => {
        setValue(value.reduce((previous , current ,itemIndex) =>{
            if (itemIndex == index){
                return [...previous , item]
            }
            return [...previous , current]
        },[]))
    }
    useEffect(()=>{ 
        setValue([...value, ...oldValue.map(e => "")]) 
    },[])
    console.log("VALUE",value)
    return (
        <>
            {oldValue && value && value.map((item , index) =>(
                    <ModifyOneItem 
                    actualItem={item} 
                    setActualItem={setActualItem} 
                    actualIndex = {index} 
                    type= {type} 
                    oldValue={oldValue} 
                    value={value}
                    />
            ))}
        </>
    )
}


function ModifyOneItem({actualIndex,setActualItem , oldValue ,value}){
    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
                <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
                <div style={{width: '50%' ,marginInline: '0.5%'}}>
                    <SimpleCard title="Nouvelle Version">
                    <p>{`Bibliographie ${actualIndex+1}`}</p>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={value[actualIndex]}
                            defaultLanguage = 'fr'
                            onBlur={(event,editor) => {setActualItem(editor.getData(),actualIndex)}} // preferred to use only this option to update the content for performance reasons
                        />
                    </SimpleCard>
                </div>
                {/* old values of the defs array */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>   
                        <SimpleCard title="Version en cours" >
                            <p>{`Bibliographie ${actualIndex+1}`}</p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={oldValue[actualIndex]} 
                                disabled={true}
                            />
                        </SimpleCard>
                </div>
            </div>     
            </div>
    </div>
    )
}