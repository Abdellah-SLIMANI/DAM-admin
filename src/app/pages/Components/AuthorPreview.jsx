import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'
import { DialogContent } from '@material-ui/core'
import { MapTitlesToKeys, titleProps } from '../Utils'
import PreviewContent from './PreviewContent'
import AuthorContent from './AuthorContent'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


export default function AuthorPreview({author,open,handleClose}){
    console.log("SELECTED AUTHOR",author)
    return (
        <div>
            <Dialog
                style={{padding: '2rem'}}
                maxWidth="md"
                fullWidth = {true}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Aperçu de l'auteur: <p dangerouslySetInnerHTML={{__html: author.nom}}></p>
                </DialogTitle>
                <DialogContent>
                        <AuthorContent author={author}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
