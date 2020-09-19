import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TipsDialog(props, ref) {
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState();


  useImperativeHandle(ref, ()=>({
      openDialog(payload){
          setPayload(payload);
          setOpen(true);
      }
  }))

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{(payload && payload.category)?payload.category:"Tips"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{(payload && payload.details)?payload.details:"No Content"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}