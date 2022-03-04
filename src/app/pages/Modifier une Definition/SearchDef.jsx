import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import SearchBar from '../Components/SearchBar'
import TableDesDefs from './comps/TableDesDefs'
import images from 'dictionnaireImages/images'
import { Breadcrumb } from 'app/components'

export default function ModifyDef (){
    const history = useHistory()
    // const word = localStorage.getItem("SearchedWord")
    const url = 'http://13.36.215.163:8000/api/elastic/search/?titre='
        function handleSearch(word){
           if(word != null){
            let queryString = "titre=" + word.titre;
            localStorage.setItem('modifyWord',word.titre)
            history.push(`/modifier-une-definition/?${queryString}`);
           }
        }
        return (
            <div>
            <div className='pt-10 pl-10'>
                <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des définition', path: '/tableaux-de-bord' },
                        { name: 'Modifier une définition' },
                    ]}
                />
                </div>
                <div className='mt-5'>
                    <img src={images.livre}/>
                    <div style={{transform: 'translate(0,-100%)', width: '40%', margin: 'auto'}}>
                        <SearchBar
                            handleSearch={handleSearch} 
                            url= {url} 
                            noOptionsText={'Aucune définition'} 
                            label={"Saisir le titre de la définition"}
                        />
                    </div>
                </div>
                <TableDesDefs />
            </div>
        )
    }
