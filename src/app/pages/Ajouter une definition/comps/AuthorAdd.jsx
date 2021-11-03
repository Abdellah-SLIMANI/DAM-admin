import { SimpleCard } from 'app/components'
import React from 'react'
import JoditEditor from "jodit-react";
import { Button } from '@material-ui/core';

export default function AuthorAdd({value,setValue,type}) {
    const emptyHelper = {definition: '', commentaire: ''}
    const ajouterItem = () => {
        setValue([...value, emptyHelper])
    }

    const setActualItem = (item,index) => {
        setValue(value.reduce((previous , current ,itemIndex) =>{
            if (itemIndex == index){
                return [...previous , item]
            }
            return [...previous , current]
        },[]))
    }
    return (
        <>
            {value.map((item , index) => <AddOneItem actualItem = {item} setActualItem={setActualItem} actualIndex = {index} type= {type}/>)}
            <Button onClick={()=> ajouterItem()}>Ajouter une definition</Button>
        </>
    )
}

function AddOneItem({actualItem,actualIndex,setActualItem, type}){
    const config = {
        "uploader": {
            "insertImageAsBase64URI": true
          },
        readonly: false, 
        language: "fr",
        resizer: {
            "showSize": true,
            "hideSizeTimeout": 0,
            "min_width": 10,
            "min_height": 10
        },
        useSplitMode: true,
        width: '100%',
        editHTMLDocumentMode: true
    }

    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
                <SimpleCard title={`Definition ${actualIndex+1}`} >
                    <JoditEditor
                    value={actualItem.definition} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {setActualItem({...actualItem, definition:newContent},actualIndex)}}
                />
                </SimpleCard>
            </div>

                <SimpleCard className='p-5' style={{width: '100%', marginBottom: '2rem'}} title={`Complément ${actualIndex+1}`}>
                    <JoditEditor
                    value={actualItem.commentaire} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {setActualItem({...actualItem, commentaire:newContent},actualIndex)}}
                />
                </SimpleCard>
    </div>
    )
}
