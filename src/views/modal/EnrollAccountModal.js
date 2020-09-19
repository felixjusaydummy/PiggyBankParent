import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as ACTIONTYPE from "../../js/constants/action-type";
import * as STATUSTYPE from "../../js/constants/status-type";



export default function PurseAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [task, setTask] = React.useState(ACTIONTYPE.BANKACCOUNT_ACCOUNT_ENROLLACCOUNT);
  const [currentAccount, setCurrentAccount] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [iBankName, setBankName] = React.useState("");
  const [iAccountNumber, setAccountNumber] = React.useState("");
  const [accountType, setAccountType] = React.useState(STATUSTYPE.ACCOUNTTYPE_DEPOSIT)
  const [isError, setError] = React.useState(false);
  
  useImperativeHandle(ref, ()=> ({
    openEnrollAccount(accountType){
      setAccountType(accountType)
      setCurrentAccount(null);
      setOpen(true);
      setError(false);
    }
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {

    if(iBankName && iAccountNumber){

      const payload = {
        accountNo : iAccountNumber,
        bankName: iBankName,
        type : accountType,
        //temp values
        balance: 10000,
        main: false
      }
      props.passEnrollAccount(payload);
      setOpen(false);

    }else{
      setError("Please enter valid description or amount");
    }
  };

  const getTitle = ()=>{
    if(accountType === STATUSTYPE.ACCOUNTTYPE_DEPOSIT){
      return "Enroll DEPOSIT Account"
    }else{
      return "Enroll CREDIT Account"
    }
      
  }

  const getMessageDescription = ()=>{
    if(!isError){
      return "Please enter your bank name and account number"
    }else{
      return isError;
    }
  }

  const getSubmitButtonText = ()=>{
    return "Enroll Account";
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{getTitle()}</DialogTitle>
        <DialogContent>

          <DialogContentText>{getMessageDescription()}
          </DialogContentText>
          
          <TextField 
            autoFocus 
            margin="dense" 
            name="iAccountNumber" 
            label="AccountNumber" 
            type="text"
            fullWidth 
            onChange={(evt)=>{ setAccountNumber(evt.target.value) }}
            />
          <TextField
            margin="dense"
            id="iBankName"
            name="iBankName"
            label="Bank name"
            type="text"
            fullWidth
            onChange={(evt)=>{setBankName(evt.target.value);}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateAndClose} color="primary">{getSubmitButtonText()}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



