import { Button, InputAdornment, TextField } from '@material-ui/core'
import images from 'dictionnaireImages/images'
import React, { useState } from 'react'
import { TextValidator } from 'react-material-ui-form-validator'
import './search.css'
import axios from 'axios'
import { Search } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import SearchBarr from "material-ui-search-bar"


export default function SearchBar() {
    const [value, setValue] = useState('')
    const history = useHistory();

    function handleSearch(word){
        let queryString = "titre=" + word;
        localStorage.setItem('modifyWord',word)
        history.push(`/modifier-une-defintion/?${queryString}`);
        // window.location.reload();
    }

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    console.log("VALUE",value)

    return (
        <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
            <img src={images.logoDicMaxi} alt="" className='m-auto'/>
            <h4 className='text-white text-bold'>Chercher une définition pour la modifier</h4>
                        <div className=' m-auto' style={{width: '40%',transform: 'translate(0px, 100%)'}}>
            <SearchBarr
                placeholder = "Entrez le titre d'une définition"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onRequestSearch={() => handleSearch(value)}
            />
            </div>
        </div>
    )
}
