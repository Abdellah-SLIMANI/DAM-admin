import React, { Component } from 'react'
import MainSearchBar from '../MainSearchBar'
import SearchBar from '../Modifier une Definition/SearchDef'
import DeleteDefinition from './comps/DeleteDefinition'

export default function ModifyDef(){
        return (
            <div>
                <MainSearchBar />
                <DeleteDefinition />
            </div>
        )
}
