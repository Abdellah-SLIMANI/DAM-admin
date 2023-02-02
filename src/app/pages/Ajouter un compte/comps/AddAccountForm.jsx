import React, { useState } from 'react'
import {
    Card,
    Grid,
    Button,
    TextField,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import images from '../../../../dictionnaireImages/images'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function AddAccountForm() {
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        nom: '',
        prenom: '',
        email: '',
        role: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            axios.post('http://51.68.80.15:8000/api/administration/create_account/', userInfo)
            .then(res=> res.status == 200 ? history.push('./tableaux-de-bord'): alert("problem accured"))
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    const suggestions = [
        {
            label: 'Administrateur'
        },
        {
            label: 'Valideur'
        },
        {
            label: 'Utilisateur'
        }
    ]
    

    return (
        <div>
        <Card>
            <Grid container className='flex flex-column justify-center items-center'>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <div className="p-8 flex justify-center items-center h-full">
                        <h3>Remplissez ce formulaire pour ajouter un utilisateur!</h3>
                        <img
                            className="w-100"
                            src={images.logoDicMini}
                            alt=""
                        />
                    </div>
                </Grid>
                <Grid item lg={7} md={7} sm={7} xs={12} style={{width: 'inherit'}}>
                    <div className="p-8 h-full bg-light-gray relative">
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                className="mb-6 w-full"
                                // variant="outlined"
                                size="small"
                                label="Nom"
                                onChange={handleChange}
                                type="text"
                                name="nom"
                                value={userInfo.nom}
                                validators={['required']}
                                errorMessages={[
                                    'Ce champ est obligatoire!',
                                ]}
                            />
                        <TextValidator
                                className="mb-6 w-full"
                                // variant="outlined"
                                size="small"
                                label="Prenom"
                                onChange={handleChange}
                                type="text"
                                name="prenom"
                                value={userInfo.prenom}
                                validators={['required']}
                                errorMessages={[
                                    'Ce champ est obligatoire!',
                                ]}
                            />
                               <TextValidator
                                    className="mb-6 w-full"
                                    // variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Ce champ est obligatoire!',
                                        "L'email n'est pas valide",
                                    ]}
                                />
                                <Autocomplete
                                    className="mb-6 w-full"
                                    options={suggestions}
                                    getOptionLabel={(option) => option.label}
                                    name= 'role'
                                    inputValue={userInfo.role}
                                    onInputChange={(event, newInputValue) => {
                                        setUserInfo({...userInfo ,role:newInputValue});
                                      }}
                                    renderInput={(params) => (
                                        <TextField
                                        validators={['required']}
                                        errorMessages={[
                                            'Ce champ est obligatoire!',
                                        ]}
                                            {...params}
                                            label="Role"
                                            // variant="outlined"
                                            name= 'role'
                                            value={userInfo.role}
                                            type= 'text'
                                            fullWidth
                                        />   
                                    )}
                                />
                            <div className="flex flex-wrap items-center mb-4">
                                <div className="relative">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        Ajouter
                                    </Button>
                                </div>
                            </div>
                        </ValidatorForm>
                    </div>
                </Grid>
            </Grid>
        </Card>
    </div>
    )
}
