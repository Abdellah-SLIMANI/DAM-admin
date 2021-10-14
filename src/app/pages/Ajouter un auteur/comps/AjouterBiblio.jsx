import { SimpleCard } from 'app/components'
import React from 'react'
import { Button } from '@material-ui/core';
import { config } from 'app/pages/Utils';
import JoditEditor from 'jodit-react';

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
                <JoditEditor
                    value={actualItem.toString()}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setActualItem(newContent,actualIndex)} // preferred to use only this option to update the content for performance reasons
                />
                </SimpleCard> 
            </div>
    </div>
    )
}
