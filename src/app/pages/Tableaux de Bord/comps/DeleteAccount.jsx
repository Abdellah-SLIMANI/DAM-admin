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

export default function DeleteAccount({user,open ,handleClose}) {
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

    useEffect(() => {
        axios.get("http://13.36.215.163:8000/api/administration/user/"+user.id+"/", {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(res => 
                setCurrentUser(res.data)
            )
    }, [])
    userInfo = currentUser;


    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            axios.delete('http://13.36.215.163:8000/api/administration/user/'+user.id+'/', {headers: {"Authorization": `Bearer  ${localStorage.getItem('accessToken')}`}})
            .then(res=> res.status == 204 ? window.location.reload() : alert("problem occured"))
            // .finally(
            //     window.location.reload()
            // )
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
                        Confirmez vous la suppression de l'utilisateur: {user.last_name} {user.first_name} ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Vous êtes sûr ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Non
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
