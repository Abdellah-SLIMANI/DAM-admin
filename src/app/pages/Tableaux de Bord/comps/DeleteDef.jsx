import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteDef({def,open ,handleClose}) {
    const handleFormSubmit = async () => {
        try {
            axios.delete('http://13.36.215.163:8000/api/administration/article/'+def.id+'/', {headers: {"Authorization": `Bearer  ${localStorage.getItem('accessToken')}`}})
            .then(res=> res.status == 204 ? window.location.reload() : alert("problem occured"))
        } catch (e) {
            console.log(e)

        }
    }
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
                    Confirmez-vous la suppression de la définition: <p dangerouslySetInnerHTML={{__html: def.titre}}></p>
                </DialogTitle>
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
