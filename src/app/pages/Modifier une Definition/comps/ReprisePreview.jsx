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
import { words } from 'lodash-es'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function ReprisePreview({word,open,handleClose}) {
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
                    Aperçu du Definition: <p dangerouslySetInnerHTML={{__html: word.titre}}></p>
                </DialogTitle>
                <DialogContent>
                        <div dangerouslySetInnerHTML={{__html: word.preview}}></div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
