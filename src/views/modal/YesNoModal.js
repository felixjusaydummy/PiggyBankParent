import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props, ref) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [payload, setPayload] = React.useState();


  useImperativeHandle(ref, ()=>({
      openDialog(message, payload){
          setMessage(message);
          setPayload(payload);
          setOpen(true);
      }
  }))

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreeClose = () => {
      props.passAgreeSelection(payload)
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
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgreeClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}