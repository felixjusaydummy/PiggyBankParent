import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
    USER_SAVINGSACCOUNT_TO_VAULT,
    USER_SAVINGSACCOUNT_FROM_VAULT
} from "../../js/constants/action-type";



function PurseAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [iTask, setTask] = React.useState(USER_SAVINGSACCOUNT_TO_VAULT);
  const [open, setOpen] = React.useState(false);
  const [iAmount, setAmount] = React.useState();
  const [isError, setError] = React.useState(false);
  
  useImperativeHandle(ref, ()=> ({
        transferSavingsToVault(iAmount){
            setTask(USER_SAVINGSACCOUNT_TO_VAULT);
            setAmount(iAmount);
            setOpen(true);
            setError(false);
        },
        transferVaultToSavingsAccount(iAmount){
            setTask(USER_SAVINGSACCOUNT_FROM_VAULT);
            setAmount(iAmount);
            setOpen(true);
            setError(false);
        }
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {
    if(Number(iAmount)>0){
        props.transferSavings(iAmount);
        setOpen(false);
    }
  };



  const getTitle = ()=>{
    if(iTask === USER_SAVINGSACCOUNT_TO_VAULT){
      return"Transfer Saving Account to Vault";
    }else{
      return "Transfer Vault to Savings Account";
    }
  }

  const getSubmitButtonText = ()=>{
    return "Transfer"
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{getTitle()}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="Number"
            fullWidth
            defaultValue = {iAmount}
            onChange={(evt)=>{setAmount(evt.target.value);}}
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




export default PurseAllocationModal