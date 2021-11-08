import React, { useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'
import { DialogContent } from '@material-ui/core'
import { MapTitlesToKeys, titleProps } from '../Utils'

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
                    <div>
                <div className= "title">
                           {Object.keys(titleProps).map(key => {
                               if(key === titleProps[key] && selectedWord[key] != ""){
                                    if(key == 'titre'){
                                        return <span dangerouslySetInnerHTML={{__html: selectedWord[key] + " "}}></span> 
                                    }
                                    if(key == 's_cat'){
                                        return <span style={{fontWeight: 'normal', fontSize: '17px'}} dangerouslySetInnerHTML={{__html: selectedWord[key]}}></span>
                                    }
                                    return <p  style={{fontWeight: 'normal', fontSize: '17px'}} dangerouslySetInnerHTML={{__html: selectedWord[key]}}></p>
                               }
                           })}
                   </div>
                   <div className="mainArea fontTarget">
                       {Object.keys(MapTitlesToKeys).map(key => {
                        if(MapTitlesToKeys[key]){
                           if(key === MapTitlesToKeys[key].name && selectedWord[key] != ""){
                               if(MapTitlesToKeys[key].type === 'normal' && MapTitlesToKeys[key].type){
                                    return <div style={{marginBottom: '1rem'}}>
                                            {MapTitlesToKeys[key].name === 'edition'
                                             ? 
                                            <span style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html:MapTitlesToKeys[key].label + " "}}></span>
                                             : 
                                            <span style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html:MapTitlesToKeys[key].label + " : " }}></span>}<span dangerouslySetInnerHTML={{__html: selectedWord[key]}}></span>
                                        </div>
                               }else if(MapTitlesToKeys[key].type === 'definition'){
                                    return <div style={{marginBottom: '1rem'}}>
                                                {
                                                    selectedWord[key] && selectedWord[key].map(
                                                        (def,index)=>{      
                                                            return<> {  selectedWord[key].length > 1 && <h6>{[index+1] + '.'} </h6> }<p dangerouslySetInnerHTML={{__html: def.definition }}></p>
                                                            {
                                                                def.commentaire && 
                                                                <div style={{marginLeft: '25px'}}><h6 style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html: def.commentaire }}></h6></div>
                                                            }
                                                            </>
                                                        }
                                                    )
                                                }
                                            </div>
                               }
                               else if (MapTitlesToKeys[key].type === 'voir'){
                                    return <>
                                    <div style={{marginBottom: '1rem'}}>
                                                <span style={{fontStyle: 'italic'}}>{MapTitlesToKeys[key].label && MapTitlesToKeys[key].label +" : "}</span>    
                                                <span>{selectedWord[key] && selectedWord[key].map((e) => <span>{e.titre + " "}</span>)}</span>
                                            </div></>
                               }
                           }
                        }
                        })}
                   </div>
              </div>
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
