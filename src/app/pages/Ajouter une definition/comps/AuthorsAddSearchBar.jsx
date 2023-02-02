import React from 'react'
import SearchBar from '../../Components/SearchBar'

export default function AuthorsAddSearchBar() {
    function handleSearch(word){
        if(word != null){
             setValue([...value, {id:word.id,nom:word.nom}])
        }
     }
     return (     
         <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
         <SearchBar 
             handleSearch={handleSearch} 
             url = {'http://51.68.80.15:8000/api/elastic/auteur/?nom='} 
             noOptionsText = 'Aucun auteur' 
             label="Saisir le nom de l'auteur"
         />
         {/* {value.map(val => <div className='m-2'>
         <SimpleCard>
             {val.titre}
         </SimpleCard></div>)} */}
         </div>
     )
}
