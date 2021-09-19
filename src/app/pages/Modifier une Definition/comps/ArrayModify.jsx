import { SimpleCard } from 'app/components'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import JoditEditor from "jodit-react";
import { Button, TextField } from '@material-ui/core';
import { ReadOnly, config } from 'app/pages/Utils';
import TxtModify from 'app/pages/Ajouter une definition/comps/TxtModify';

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
            {value.length && value.map((item , index) =>(
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
                            <JoditEditor
                            value={actualItem.description} 
                            config={ReadOnly}
                            onBlur={(newContent) => setActualItem({...actualItem, description:newContent},actualIndex)}
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
                                <JoditEditor
                                value={oldValue[actualIndex].description} 
                                config={config}
                                tabIndex={1}
                                
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
                        <JoditEditor
                                value={actualItem.definition} 
                                config={ReadOnly}
                                tabIndex={1}
                                onBlur = {(newContent) => {setActualItem({...actualItem, definition:newContent},actualIndex)}}
                            />
                        <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                            <JoditEditor
                                value={actualItem.commentaire} 
                                config={ReadOnly}
                                tabIndex={1}
                                onBlur={(newContent) => {setActualItem({...actualItem, commentaire:newContent},actualIndex)}}
                            />
                    </SimpleCard>
                </div>
                {/* old values of the defs array */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>   
                        <SimpleCard title="Version en cours" >
                            <p>{`Definition ${actualIndex+1}`}</p>
                            <JoditEditor
                                value={oldValue[actualIndex].definition} 
                                config={ReadOnly}
                                tabIndex={1}
                            />
                            <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                            <JoditEditor
                                value={oldValue[actualIndex].commentaire} 
                                config={ReadOnly}
                                tabIndex={1}
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