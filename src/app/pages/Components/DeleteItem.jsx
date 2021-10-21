import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteItem({item ,open ,handleClose,message,url}) {
    const handleFormSubmit = async () => {
        try {
            axios.delete(url+item.id+'/', {headers: {"Authorization": `Bearer  ${localStorage.getItem('accessToken')}`}})
            .then(res=> res.status == 204 || res.status == 200 ? window.location.reload() : alert("problem occured"))
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
                     {message} <p dangerouslySetInnerHTML={{__html: item.titre || item.nom}}></p>
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
