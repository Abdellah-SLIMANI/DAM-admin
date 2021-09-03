import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {
    Grid,
    TextField,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function ModifyUserDialog({user,open ,handleClose}) {
    const [currentUser, setCurrentUser] = useState(user)
    
    const handleFormSubmit = async (event) => {
        try {
            axios.put('http://13.36.215.163:8000/api/administration/user/'+user.id+'/', user ,)
            .then(res=> console.log("RES IN POSTING USER", res))
            .finally(handleClose)
        } catch (e) {
            console.log(e)
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
    
    console.log("USER CHANGING", currentUser)
    return (
        <div>
            <Dialog
                style={{padding: '2rem'}}
                maxWidth="xl"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                Modifier les informations de l'utilisateur: {user.last_name} {user.first_name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
            <Grid container className='flex flex-column justify-center items-center w-full'>
                        <ValidatorForm onSubmit={handleFormSubmit} style={{width: '100%'}}>
                            <TextValidator
                                className="mb-6 w-full"
                                variant="outlined"
                                size="small"
                                label="Nom"
                                onChange={(event) => user.last_name = event.target.value}
                                type="text"
                                name="last_name"
                                value={user.last_name === null || user.last_name === undefined ? '' : user.last_name}
                                validators={['required']}
                                errorMessages={[
                                    'Ce champ est obligatoire!',
                                ]}
                            />
                        <TextValidator
                                className="mb-6 w-full"
                                variant="outlined"
                                size="small"
                                label="Prenom"
                                onChange={(event) => user.first_name = event.target.value}
                                type="text"
                                name="first_name"
                                value={user.first_name === null || user.first_name === undefined ? '' : user.first_name}
                                validators={['required']}
                                errorMessages={[
                                    'Ce champ est obligatoire!',
                                ]}
                            />
                               <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={(event) => user.email = event.target.value}
                                    type="email"
                                    name="email"
                                    value={user.email === null || user.email === undefined ? '' : user.email}
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
                                    name= 'groups'
                                    inputValue={user.groups === null || user.groups === undefined ? '' : user.groups}
                                    onInputChange={(event, newInputValue) => {
                                        // setUserInfo({...userInfo ,role:newInputValue});
                                      }}
                                    renderInput={(params) => (
                                        <TextField
                                        validators={['required']}
                                        errorMessages={[
                                            'Ce champ est obligatoire!',
                                        ]}
                                            {...params}
                                            label="Role"
                                            variant="outlined"
                                            name= 'groups'
                                            value={user.groups === null || user.groups === undefined ? '' : user.groups}
                                            type= 'text'
                                            fullWidth
                                        />   
                                    )}
                                />
                        </ValidatorForm>
                </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Soumettre
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
