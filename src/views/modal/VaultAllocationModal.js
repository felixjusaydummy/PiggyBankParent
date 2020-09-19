import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { 
  TASK_POCKET_ADD_NEW,
  TASK_POCKET_ADD_AMOUNT
} from "../../js/constants/action-type";



export default function VaultAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [addAllocation, setAddAllocation] = React.useState(TASK_POCKET_ADD_NEW);
  const [currentAllocation, setCurrentAllocation] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const [iDescriptionHolder, setDescription] = React.useState("");
  const [iAmount, setAmount] = React.useState();
  const [iTargetAmount, setTargetAmount] = React.useState("");
  const [iExpiration, setExpiration] = React.useState(new Date());
  
  
  useImperativeHandle(ref, ()=> ({
    openAddNewAllocation(){
      setAddAllocation(TASK_POCKET_ADD_NEW);
      setCurrentAllocation(null);
      setDescription("");
      setAmount();
      setTargetAmount();
      setExpiration(new Date());
      setOpen(true);
      setError(false);
    },
    openEditAllocationAmount(payload){
      setAddAllocation(TASK_POCKET_ADD_AMOUNT);
      setCurrentAllocation(payload);
      setDescription(payload.description);
      setAmount();
      setTargetAmount(payload.targetAmount);
      setExpiration(new Date(payload.expiration));
      setOpen(true);
      setError(false);
    }

  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {

    if(Number(iAmount)>=0 && iDescriptionHolder){
      if(addAllocation === TASK_POCKET_ADD_NEW){
          let payload = {
              description: iDescriptionHolder,
              amount: iAmount,
              targetAmount: iTargetAmount,
              expiration: iExpiration,
              releaseRequest: false,
          }
        props.passToAddNewAllocation(payload);
        setOpen(false);
      }else if(addAllocation === TASK_POCKET_ADD_AMOUNT){
        if(Number(iAmount)>0){
          currentAllocation.targetAmount = iTargetAmount;
          currentAllocation.expiration = iExpiration;
          props.passToAddCashAllocation(currentAllocation, iAmount);
          setOpen(false);
        }else{
          setError("Amount must not be less than or equal to Zero");
        }
      }
    }else{
      setError("Please enter valid description or amount");
    }
  };



  const getTitle = ()=>{
    if(addAllocation === TASK_POCKET_ADD_NEW){
      return"Add Vault Pocket";
    }else if(addAllocation === TASK_POCKET_ADD_AMOUNT){
      return"Add Cash";
    }else{
      return "Release Pocket to Vault"
    }
  }

  const getMessageDescription = ()=>{
    if(!isError){
      if(addAllocation){
        return "Please enter your vault allocation here";
      }else{
        return "Add Additional Amount";
      }
    }else{
      return isError;
    }
  }

  const getSubmitButtonText = ()=>{
    if(addAllocation === TASK_POCKET_ADD_NEW){
      return "Create";
    }else if (addAllocation === TASK_POCKET_ADD_AMOUNT){
      return "Add Cash";
    }else{
      return "Release Cash";
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{getTitle()}</DialogTitle>
        <DialogContent>

          <DialogContentText>{getMessageDescription()}
          </DialogContentText>

          {(addAllocation === TASK_POCKET_ADD_NEW)?(
            //ADD NEW ALLOCATION
            <TextField 
            autoFocus 
            margin="dense" 
            name="iDescriptionHolder" 
            label="Description" 
            type="text"
            fullWidth 
            onChange={(evt)=>{ setDescription(evt.target.value) }}
            />
          ):(
            //ADD CASH
            <TextField 
            autoFocus 
            margin="dense" 
            name="iDescriptionHolder" 
            label="Description" 
            type="text"
            fullWidth 
            value = {currentAllocation.description}
            />
          )}
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

            <TextField
            margin="dense"
            id="targetAmount"
            name="targetAmount"
            label="Target Amount"
            type="Number"
            fullWidth
            defaultValue = {iTargetAmount}
            onChange={(evt)=>{setTargetAmount(evt.target.value);}}
            />

            <DialogContentText>Expiration</DialogContentText>
            <DatePicker 
            inline
            fullWidth
            selected={iExpiration} 
            onChange={date => setExpiration(date)} />

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
