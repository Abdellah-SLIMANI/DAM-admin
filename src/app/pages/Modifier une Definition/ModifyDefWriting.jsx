import React, { Component } from 'react'
React.lazy(()=> import('./comps/ModifyDefTxtEdit'))

export default function ModifyDefWriting() {
        const ModifyDefTxtEdit = React.lazy(()=> import('./comps/ModifyDefTxtEdit'))
        return (
            <div className='m-10'>
                <ModifyDefTxtEdit />
            </div>
        ) 
}
