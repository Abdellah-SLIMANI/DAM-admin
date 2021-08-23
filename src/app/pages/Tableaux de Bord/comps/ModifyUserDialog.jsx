import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { Icon, IconButton } from '@material-ui/core'
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

export default function ModifyUserDialog({user}) {
    const [open, setOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState([]) 
    // const [userInfo, setUserInfo] = useState({
    //     last_name: '',
    //     first_name: '',
    //     email: '',
    //     groups: ''
    // })
    let userInfo = {
                last_name: '',
        first_name: '',
        email: '',
        groups: ''
    };
    const [loading, setLoading] = useState(false)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    useEffect(() => {
        axios.get("http://13.36.215.163:8000/api/administration/user/"+user.id+"/", {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(res => 
                setCurrentUser(res.data)
            )
    }, [])
    userInfo = currentUser;
    console.log("USEEEEEEEEEEEEEEEEEER",currentUser , "THEN\n", userInfo)

    const handleChange = ({ target: { name, value } }) => {
        let temp =  {...userInfo }
        temp[name] = value
        console.log("TEMP",temp)
        userInfo = temp;
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        console.log("UserInfo",userInfo)
        try {
            axios.put('http://13.36.215.163:8000/api/administration/user/'+user.id+'/', userInfo)
            .then(res=> console.log("RES IN POSTING USER", res))
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
            <IconButton onClick={handleClickOpen}>
                <Icon>edit</Icon>
            </IconButton>
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
                                onChange={handleChange}
                                type="text"
                                name="last_name"
                                value={userInfo.last_name === null || userInfo.last_name === undefined ? '' : userInfo.last_name}
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
                                onChange={handleChange}
                                type="text"
                                name="first_name"
                                value={userInfo.first_name === null || userInfo.first_name === undefined ? '' : userInfo.first_name}
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
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email === null || userInfo.email === undefined ? '' : userInfo.email}
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
                                    inputValue={userInfo.groups === null || userInfo.groups === undefined ? '' : userInfo.groups}
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
                                            value={userInfo.groups === null || userInfo.groups === undefined ? '' : userInfo.groups}
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
                    <Button onClick={handleFormSubmit} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Soumettre
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
