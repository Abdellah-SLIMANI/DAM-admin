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
import { useHistory } from 'react-router'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function ModifyUserDialog({user,open ,handleClose}) {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({
        last_name: '',
        first_name: '',
        email: '',
        groups: ''
    })

    useEffect(() => {
        console.log("user inside useEffect",user)
        setCurrentUser({
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            groups: user.groups
        })
    }, [user])
    
    const handleFormSubmit = async (event) => {
        try {
            axios.put('http://13.36.215.163:8000/api/administration/user/'+user.id+'/', currentUser ,{headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(res=> res.statusText === 'OK' ? window.location.reload() : alert("Server Problem"))

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
                        <ValidatorForm style={{width: '100%'}}>
                            <TextValidator
                                className="mb-6 w-full"
                                variant="outlined"
                                size="small"
                                label="Nom"
                                value={currentUser.last_name === null || currentUser.last_name === undefined ? '' : currentUser.last_name}
                                onChange={(event) => setCurrentUser({...currentUser, last_name:event.target.value})}
                                type="text"
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
                                type="text"
                                name="first_name"
                                value={currentUser.first_name === null || currentUser.first_name === undefined ? '' : currentUser.first_name}
                                onChange={(event) => setCurrentUser({...currentUser, first_name:event.target.value})}
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

                                    type="email"
                                    name="email"
                                    value={currentUser.email === null || currentUser.email === undefined ? '' : currentUser.email}
                                    onChange={(event) => setCurrentUser({...currentUser, email:event.target.value})}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Ce champ est obligatoire!',
                                        "L'email n'est pas valide",
                                    ]}
                                />
                                <Autocomplete
                                    className="mb-6 w-full"
                                    options={suggestions}
                                    getOptionLabel={(option) => option.label || ''}
                                    name= 'groups'
                                    inputValue={currentUser.groups}
                                    onInputChange={(event, newInputValue) => {
                                        setCurrentUser({...currentUser ,groups:newInputValue});
                                      }}
                                      defaultValue={currentUser.groups}
                                    renderInput={(params) => (
                                        <TextField
                                        validators={['required']}
                                        errorMessages={[
                                            'Ce champ est obligatoire!',
                                        ]}
                                            {...params}
                                            label="Role"
                                            variant="outlined"
                                            value={currentUser.groups}
                                            name= 'groups'
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
