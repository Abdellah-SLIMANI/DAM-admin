import { useHistory } from 'react-router';
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import images from 'dictionnaireImages/images';
import './search.css'

function SearchBar({selectedWord,setSelectedWord,location}) {
    const [words,setWords] = useState([])
    const [url,setUrl] = useState("")
    const history = useHistory()

    const handleOnSearch = (string, results) => {
        fetch("http://13.36.215.163:8000/api/elastic/search/?titre="+string)
        .then(response => response.json())
        .then((data) => setWords(data))
      }
      
      const handleOnSelect = (item) => {
        console.log("ORWEOO ITEM DA",item)
        let queryString = "titre=" + item.titre;
        localStorage.setItem('modifyWord',item.titre)
        history.push(`/modifier-une-definition/?${queryString}`);
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

    return (
         <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
             <img src={images.logoDicMaxi} alt="" style={{transform: 'translate(0,20%)'}}/>
                <div className=' m-auto' style={{width: '40%',transform: 'translate(0px, 100%)'}}>
                <ReactSearchAutocomplete
                inputDebounce= {0}
                items={words}
                fuseOptions={{ keys: ["titre", "description"] }}
                resultStringKeyName="titre"
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                placeholder = "Saisir le titre de la définition"
                autoFocus
          />
             </div>
         </div>

    )
    
}

export default SearchBar;

// import { Button, InputAdornment, TextField } from '@material-ui/core'
// import images from 'dictionnaireImages/images'
// import React, { useState } from 'react'
// import { TextValidator } from 'react-material-ui-form-validator'
// import './search.css'
// import axios from 'axios'
// import { Search } from '@material-ui/icons'
// import { useHistory } from 'react-router-dom'
// import SearchBarr from "material-ui-search-bar"


// export default function SearchBar() {
//     const [value, setValue] = useState('')
//     const history = useHistory();

//     function handleSearch(word){
//         let queryString = "titre=" + word;
//         localStorage.setItem('modifyWord',word)
//         history.push(`/modifier-une-definition/?${queryString}`);
//         // window.location.reload();
//     }

//     const handleChange = (event) => {
//         setValue(event.target.value);
//       };

//     console.log("VALUE",value)

//     return (
//         <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
//             <img src={images.logoDicMaxi} alt="" className='m-auto'/>
//             <h4 className='text-white text-bold'>Chercher une définition pour la modifier</h4>
//                         <div className=' m-auto' style={{width: '40%',transform: 'translate(0px, 100%)'}}>
//             <SearchBarr
//                 placeholder = "Entrez le titre d'une définition"
//                 value={value}
//                 onChange={(newValue) => setValue(newValue)}
//                 onRequestSearch={() => handleSearch(value)}
//             />
//             </div>
//         </div>
//     )
// }

// import fetch from 'cross-fetch'
// import React, { useState } from 'react'
// import { TextField, CircularProgress } from '@material-ui/core'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import images from 'dictionnaireImages/images'
// import { useHistory, useLocation } from 'react-router-dom'
// import { functions } from 'lodash-es'

// export default function AsyncAutocomplete() {
//     const [open, setOpen] = React.useState(false)
//     const [defs, setDefs] = React.useState([])
//     const [value, setValue] = React.useState('')
//     const [loading, setLoading] = React.useState(false)

//     const [inputValue, setInputValue] = React.useState('');
//     const history = useHistory()
//     let location = useLocation();

//     const handleChange = (event) => {
//         console.log(value, 'INSIDE ONCHANGE')
//         setValue(event.target.value);
//       };

//       const myComp = React.memo(      function handleSearch(word){
//         console.log( 'WE ARE IN')
//         let queryString = "titre=" + word;
//         localStorage.setItem('modifyWord',word)
//         history.push(`/modifier-une-definition/?${queryString}`);
//     })

//     React.useEffect(() => {
//         setLoading(true)
//         console.log("VALUEEEEE",value)
//         ;(async () => {
//             const response = await fetch(
//                 `http://13.36.215.163:8000/api/elastic/search/?titre=${inputValue}`
//             ).finally(() => {setLoading(false)})
//             // await sleep(1e3) // For demo purposes.
//             const defs = await response.json()

//                 setDefs(
//                     defs
//                 )
//             console.log('defss',defs)
//             console.log("keys defs",Object.keys(defs))
//         })()

//     }, [inputValue,location.pathname])

//     React.useEffect(() => {
//         if (!open) {
//             setDefs([])
//         }
//     }, [open])

//     console.log('INPUT VALUE',inputValue)
//     return (
        

//         <div className='searchContainer m-auto p-5' style={{textAlign: 'center'}}>
//             <img src={images.logoDicMaxi} alt="" className='m-auto'/>
//                         <div className=' m-auto' style={{width: '40%',transform: 'translate(0px, 100%)'}}>
//             <Autocomplete
//             id="asynchronous-demo"
//             className="w-300"
//             open={open}
//             onOpen={() => {
//                 setOpen(true)
//             }}
//             onClose={() => {
//                 setOpen(false)
//             }}
//             inputValue={inputValue}
//             onInputChange={(event, newInputValue) => {
//               setInputValue(newInputValue);
//             }}
//             getOptionSelected={(def,value) => (def.titre === value.titre && myComp( ))}
//             getOptionLabel={(def) => def.titre}
//             options={defs}
//             loading={loading}
//             renderInput={(params) => (
//                 <TextField
//                     {...params}
//                     label="Saisir le titre de la définition"
//                     fullWidth
//                     className ='bg-white'
//                     variant="outlined"
//                     InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                             <React.Fragment>
//                                 {loading ? (
//                                     <CircularProgress
//                                         color="inherit"
//                                         size={20}
//                                     />
//                                 ) : null}
//                                 {params.InputProps.endAdornment}
//                             </React.Fragment>
//                         ),
//                     }}
//                 />
//             )}
//         />
//             </div>
//         </div>
//     )
// }
/************************************************************************************************************************************************************* */
