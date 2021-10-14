import { SimpleCard } from 'app/components'
import React, { useEffect, useState } from 'react'
import JoditEditor from "jodit-react";
import { ReadOnly, config } from 'app/pages/Utils';

export default function ArrayModify({value,setValue,type,oldValue}) {
    const emptyHelper =  {definition: '', commentaire: ''} 
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
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {value && value.map((item , index) =>(
                    <ModifyOneItem 
                        actualItem={item} 
                        setActualItem={setActualItem} 
                        actualIndex = {index}
                        type= {type} 
                        oldValue={oldValue} 
                        value={value}
                    />
            ))}
        </div>
    )
}

function ModifyOneItem({actualItem,actualIndex,setActualItem , oldValue}){
    const [localDefintion, setLocalDefintion] = useState(actualItem.definition)
    const [localComment, setLocalComment] = useState(actualItem.commentaire)

    useEffect(()=>{
        setActualItem({definition:localDefintion, commentaire:localComment}, actualIndex)
    },[localDefintion,localComment])
    return (
        <div style={{ width: '100%', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1rem'}}>
                <div style={{display: 'flex' ,flexDirection: 'row', width: '100%', marginBottom: '3rem'}}>
                    {/* this is for edditing defintions */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>
                    <SimpleCard title="Nouvelle Version">
                    <p>{`Definition ${actualIndex+1}`}</p>
                        <JoditEditor 
                            config={config}
                            tabIndex={1}
                            value={localDefintion}
                            onBlur={(newContent) => (setLocalDefintion(newContent))}
                        />
                        <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                        <JoditEditor 
                            config={config}
                            tabIndex={1}
                            value={localComment}
                            onBlur={(newContent) => (setLocalComment(newContent))}
                        />
                    </SimpleCard>
                </div>
                {/* old values of the defs array */}
                <div style={{width: '50%' ,marginInline: '0.5%'}}>   
                        <SimpleCard title="Version en cours" >
                            <p>{`Definition ${actualIndex+1}`}</p>
                            <JoditEditor 
                                    config={ReadOnly}
                                    tabIndex={1}
                                    value={oldValue[actualIndex] && oldValue[actualIndex].definition}
                                />
                            <p className='mt-5'>{`Commentaire ${actualIndex+1}`}</p>
                            <JoditEditor 
                                    config={ReadOnly}
                                    tabIndex={1}
                                    value={oldValue[actualIndex] && oldValue[actualIndex].commentaire}
                                />
                        </SimpleCard>
                </div>
            </div>
            {/* <Button onClick={()=>{ oldValue[actualIndex] = {definition:localDefintion, commentaire:localComment}}} style={{background: '#eee', margin: '1%'}}><RedoIcon style={{transform: 'rotate(180deg)'}}></RedoIcon></Button> */}
            </div>
    </div>
    )
}