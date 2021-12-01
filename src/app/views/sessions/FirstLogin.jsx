import React, { useState,useEffect } from 'react'
import { Card, Grid, Button } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import images from 'dictionnaireImages/images'


const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const FirstLogin = () => {
    const [state, setState] = useState({
        password: '',
        resetPassword: ''
    })
    const classes = useStyles()
    const history = useHistory()
    console.log(state)

    const handleChange = ({ target: { name, value } }) => {
        setState({
          ...state,
            [name]: value,
        })
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      let query = useQuery();
      let token = query.get('token')
      console.log("TOKEN",token)
      useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false;
            }
            return true;
        });
      }, [state.password])

    const handleFormSubmit = (event) => {
        const body = {
            password : state.password,
            token: token
        }

        axios.post("http://13.36.215.163:8000/password_reset/confirm/", body)
        .then(res=> res.statusText == "OK" ? history.push(`/session/login`) : alert('error'))
    }

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
                        <h4 color='gray'>Entrez votre mot de passe</h4>

                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    // variant="outlined"
                                    label="Mot de passe"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    size="small"
                                    value={state.password || ''}
                                    validators={['required']}
                                    errorMessages={[
                                        'Ce champ est obligatoire',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    // variant="outlined"
                                    label="Confirmer votre mot de passe"
                                    onChange={handleChange}
                                    type="password"
                                    name="resetPassword"
                                    size="small"
                                    value={state.resetPassword}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['Veuillez utiliser le même mot de passe', 'Ce champ est obligatoire']}
                                />
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Confirmer
                                    </Button>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default FirstLogin
