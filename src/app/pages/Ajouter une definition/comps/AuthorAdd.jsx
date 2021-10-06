import { SimpleCard } from 'app/components'
import React, { useState } from 'react'
import JoditEditor from "jodit-react";
import { Button, TextField } from '@material-ui/core';

export default function AuthorAdd({value,setValue,type}) {
    const emptyHelper = type == 'author' ? {nom: '', description: ''} : type == 'definition' ? {definition: '', commentaire: ''} : null

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
    console.log("VALUE", value)
    return (
        <>
            {value.map((item , index) => <AddOneItem actualItem = {item} setActualItem={setActualItem} actualIndex = {index} type= {type}/>)}
            <Button onClick={()=> ajouterItem()}>{type == 'author' ? 'Ajouter un auteur': 'Ajouter une definition'}</Button>
        </>
    )
}

function AddOneItem({actualItem,actualIndex,setActualItem, type}){
    const [localAuteur, setLocalAuteur] = useState(actualItem.nom)

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
        askBeforePasteHTML: false,
        width: '100%',
        "buttons": "source,bold,italic,underline,strikethrough,eraser,superscript,subscript,ul,ol,indent,outdent,left,font,fontsize,paragraph,classSpan"
	}

    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
                {
                    type == 'author' ? 
                    <SimpleCard title={`Nom de l'auteur ${actualIndex+1}`} >
                    <TextField 
                    label= 'Nom'
                    variant= 'outlined'
                    className='w-full'
                    name = 'nom'
                    value={localAuteur}
                    onChange = {(event) => setLocalAuteur(event.target.value)}
                    onBlur = {(event) => setActualItem({...actualItem , nom: localAuteur} , actualIndex)}
                    
                />
                </SimpleCard>
                : type == 'definition' ?
                <SimpleCard title={`Definition ${actualIndex+1}`} >
                    <JoditEditor
                    value={actualItem.definition} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {setActualItem({...actualItem, definition:newContent},actualIndex)}}
                />
                </SimpleCard> : null
                }

            
            </div>
{
                    type == 'author' ? 
                    <SimpleCard className='p-5' style={{width: '100%', marginBottom: '2rem'}} title={`Description de l'auteur ${actualIndex+1}`}>
                    <JoditEditor
                    value={actualItem.description} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {setActualItem({...actualItem, description:newContent},actualIndex)}}
                />
                </SimpleCard>
                : type == 'definition' ?
                <SimpleCard className='p-5' style={{width: '100%', marginBottom: '2rem'}} title={`Commentaire ${actualIndex+1}`}>
                    <JoditEditor
                    value={actualItem.commentaire} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {setActualItem({...actualItem, commentaire:newContent},actualIndex)}}
                />
                </SimpleCard>  : null
                }
    </div>
    )
}
