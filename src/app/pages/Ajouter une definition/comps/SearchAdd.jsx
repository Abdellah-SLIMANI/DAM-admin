import fetch from 'cross-fetch'
import React from 'react'
import { TextField} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { SimpleCard } from 'app/components'
import SearchBar from '../../Components/SearchBar'


export default function SearchAdd({value,setValue}) {
   function handleSearch(word){
       if(word != null){
            setValue([...value, {id:word.id,titre:word.titre}])
       }
    }
    return (     
        <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
        <SearchBar 
            handleSearch={handleSearch} 
            url = {'http://13.36.215.163:8000/api/elastic/search/?titre='} 
            noOptionsText = 'Aucune définition' 
            label="Saisir le titre de la définition"
        />
        {value.map(val => <div className='m-2'>
        <SimpleCard>
            {val.titre}
        </SimpleCard></div>)}
        </div>
    )
}
