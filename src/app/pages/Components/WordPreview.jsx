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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


export default function WordPreview({selectedWord,open,handleClose}){
    console.log("SELECTED WORD",selectedWord)
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
                    Aperçu du Definition: <p dangerouslySetInnerHTML={{__html: selectedWord.titre}}></p>
                </DialogTitle>
                <DialogContent>
                        <PreviewContent selectedWord={selectedWord}/>
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
