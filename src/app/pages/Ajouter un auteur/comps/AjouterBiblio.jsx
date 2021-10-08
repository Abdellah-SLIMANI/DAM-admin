import { SimpleCard } from 'app/components'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr.js'
import { Button, TextField } from '@material-ui/core';

export default function AjouterBiblio({value,setValue}) {
    const ajouterItem = () => {
        setValue([...value, ""])
    }

    const setActualItem = (item,index) => {
        setValue(value.reduce((previous , current ,itemIndex) =>{
            if (itemIndex == index){
                return [...previous , item]
            }
            return [...previous , current]
        },[]))
    }
    console.log("VALUE", value)
    return (
        <>
            {value.map((item , index) => <AddOneItem actualItem = {item} setActualItem={setActualItem} actualIndex = {index}/>)}
            <Button onClick={()=> ajouterItem()}>Ajouter une bibliographie</Button>
        </>
    )
}

function AddOneItem({actualItem,actualIndex,setActualItem}){
    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
                <SimpleCard title={`Bibliographie ${actualIndex+1}`} >
                <CKEditor 
                    editor={ClassicEditor}
                    defaultlanguage='fr'
                    data={actualItem.toString()}
                    onBlur={(event,editor) => setActualItem(editor.getData(), actualIndex)} // preferred to use only this option to update the content for performance reasons
                />
                </SimpleCard> 
            </div>
    </div>
    )
}
