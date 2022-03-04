import React, { useState } from 'react'
import { Card, Grid, Button, CircularProgress } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import axios from 'axios'
import images from 'dictionnaireImages/images'
import SnackBar from 'app/pages/Components/SnackBar'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const ForgotPassword = () => {
    const [state, setState] = useState({})
    const [loading, setLoading]= useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });

    const { vertical, horizontal } = snackBarState;
    const classes = useStyles()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const onApiCallSuccess = () => {
        setOpen(true)
        setLoading(true)
        setSeverity('success')
        setMessage('Nous vous avons envoyé un e-mail pour réinitialiser votre mot de passe.')
    }

    const onApiCallFailure = () => {
        setOpen(true)
        setLoading(true)
        setSeverity('error')
        setMessage("Une erreur s'est produite, réessayez ")
    }
    
    const handleFormSubmit = (event) => {
        axios.post("http://13.36.215.163:8000/password_reset/", state)
        .then(res=>  ( res.statusText === "OK" ? onApiCallSuccess() : onApiCallFailure()))
        .catch((e)=> (onApiCallFailure(),console.log(e)))
        .finally(() => (setState({...state, email: ''}),setLoading(false)))
    }

    const handleClose = () => {
        setOpen(false)
      };
    

    let { email } = state

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-full"
                                src={images.logoDicMaxi}
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit} id='form'>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Ce champ est obligatoire',
                                        "L'email n'est pas valide",
                                    ]}
                                />
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading && <CircularProgress size={24} classes={classes.buttonProgress}></CircularProgress>}
                                        Réinitialiser le mot de passe
                                    </Button>
                                    <span className="ml-4 mr-2">ou</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
                                            Se Connecter
                                        </Button>

                                    </Link>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            <SnackBar 
                open={open}
                severity={severity}
                message={message}
                handleClose={()=> handleClose}
            />
        </div>
    )
}

export default ForgotPassword
