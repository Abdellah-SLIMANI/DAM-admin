import { SimpleCard } from 'app/components'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import JoditEditor from "jodit-react";
import { Button, TextField } from '@material-ui/core';
import { ReadOnly, config } from 'app/pages/Utils';
import TxtModify from 'app/pages/Ajouter une definition/comps/TxtModify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function ArrayModify({value,setValue,type,oldValue}) {
    const emptyHelper = type == 'author' ? {nom: '', description: ''} : type == 'definition' ? {definition: '', commentaire: ''} : null
    const setActualItem = (item,index) => {
        setValue(value.reduce((previous , current ,itemIndex) =>{
            if (itemIndex == index){
                return [...previous , item]
            }
            return [...previous , current]
        },[]))
    }
    useEffect(()=>{ 
        setValue([...value, ...oldValue.map(e => emptyHelper)]) 
    },[])
    return (
        <>
            {value && value.length  && value.map((item , index) =>(
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


function ModifyOneItem({actualItem,actualIndex,setActualItem, type , oldValue ,value}){
    const [localItem, setlocalItem] = useState(actualItem.nom)
    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
            
                {
                    type == 'author' ? 
                <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
                    {/* THis is for editting Authors */}
                    <div style={{width: '50%' ,marginInline: '0.5%'}}>
                        <SimpleCard title="Nouvelle Version">
                            <p>{`Nom de l'auteur ${actualIndex+1}`}</p>
                            <TextField 
                            label= 'Nom'
                            variant= 'outlined'
                            className='w-full'
                            name = 'nom'
                            value={localItem}
                            onChange = {(event) => setlocalItem(event.target.value)}
                            onBlur = {(event) => setActualItem({...actualItem , nom: localItem} , actualIndex)}
                            />
                            <p className='mt-5'>{`Description de l'auteur ${actualIndex+1}`}</p>
                            <CKEditor 
                            editor={ClassicEditor}
                            data={actualItem.description}
                            defaultLanguage = 'fr'
                            onBlur={(event,editor) => {setActualItem({...actualItem, description:editor.getData()},actualIndex)}} // preferred to use only this option to update the content for performance reasons
                        />
                        </SimpleCard>
                    </div>
                    {/* Old Values of the author array */}
                    <div style={{width: '50%' ,marginInline: '0.5%'}}>   
                            <SimpleCard title="Version en cours" >
                                <p>{`Nom de l'auteur ${actualIndex+1}`}</p>
                                    <TextField 
                                    label= 'Nom'
                                    variant= 'outlined'
                                    className='w-full'
                                    name = 'nom'
                                    value={oldValue[actualIndex].nom}
                                    disabled
                                /> 
                                <p className='mt-5'>{`Description de l'auteur ${actualIndex+1}`}</p>
                                        <CKEditor
                                        editor={ClassicEditor}
                                        data={oldValue[actualIndex].description} 
                                        disabled={true}
                                    />
                                </SimpleCard>
                    </div>
                </div>
                : type == 'definition' ?

                <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
                    {/* this is for edditing defintions */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>
                    <SimpleCard title="Nouvelle Version">
                    <p>{`Definition ${actualIndex+1}`}</p>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={actualItem.definition}
                            defaultLanguage = 'fr'
                            onBlur={(event,editor) => {setActualItem({...actualItem, definition:editor.getData()},actualIndex)}} // preferred to use only this option to update the content for performance reasons
                        />
                        <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={actualItem.commentaire}
                            onBlur={(event,editor) => {setActualItem({...actualItem, commentaire:editor.getData()},actualIndex)}} // preferred to use only this option to update the content for performance reasons
                        />
                    </SimpleCard>
                </div>
                {/* old values of the defs array */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>   
                        <SimpleCard title="Version en cours" >
                            <p>{`Definition ${actualIndex+1}`}</p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={oldValue[actualIndex].definition} 
                                disabled={true}
                            />
                            <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={oldValue[actualIndex].commentaire} 
                                disabled={true}
                            />
                        </SimpleCard>
                </div>
            </div>
                : null
                }

            
            </div>
    </div>
    )
}