// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
// import React from 'react';

// export default function ReinitComp({letters,open,handleClose}) {
//   return <div>
//             <Dialog
//                 style={{padding: '2rem'}}
//                 maxWidth="md"
//                 fullWidth = {true}
//                 open={open}
//                 TransitionComponent={Transition}
//                 keepMounted
                 
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-slide-title"
//                 aria-describedby="alert-dialog-slide-description"
//             >
//                 <DialogTitle id="alert-dialog-slide-title">
//                         Choisissez la lettre que vous voulez réinitialiser
//                 </DialogTitle>
//                 <DialogContent>
//                             {
//                             letters && letters.map(letter=>
//                             <Fab color={letter.status == 'Valide' ? 'primary' : 'secondary'} aria-label="add" onClick={() =>  getSousLot(letter.lettre)} className='m-2'>
//                                     <div>{letter.lettre}</div>
//                                 </Fab>
//                             )        
//                         }
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//   </div>;
// }
