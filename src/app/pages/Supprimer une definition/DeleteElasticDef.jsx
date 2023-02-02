import React, { Component } from 'react'
import SearchBar from '../Components/SearchBar'
import DeleteDefinition from './comps/DeleteDefinition'
import { useHistory } from 'react-router-dom'
import SearchToDelete from './comps/SearchToDelete'
import images from 'dictionnaireImages/images'
import { Breadcrumb } from 'app/components'

export default function DeleteElasticDef(){
    function handleSearch(word){
        if(word != null){
         let queryString = "titre=" + word.titre;
         history.push(`/supprimer-une-definition/?${queryString}`);
        }
     }
     const url = 'http://51.68.80.15:8000/api/elastic/search/?titre='
     const history = useHistory()
        return (
            <div>
                <div className='pt-10 pl-10'>
                <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des définitions', path: '/tableaux-de-bord' },
                        { name: 'Supprimer une définition' },
                    ]}
                />
                </div>
                {/* <SearchToDelete /> */}
                <div className='mt-5'>
                    <img src={images.livre} style={{width: '100vw'}}/>
                    <div style={{transform: 'translate(0,-125%)', width: '40%', margin: 'auto'}}>
                        <SearchBar
                            handleSearch={handleSearch} 
                            url= {url} 
                            noOptionsText={'Aucune définition'} 
                            label={"Saisir le titre de la définition"}
                        />
                    </div>
                </div>
                <DeleteDefinition />
            </div>
        )
}
