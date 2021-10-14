import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

export default function SnackBar({open,severity,message,handleClose}) {

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
