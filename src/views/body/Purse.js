import React from 'react';
import {connect} from 'react-redux'
import uuid from 'react-uuid'


import { useStyles } from "../../css/purse";
import Title from '../../components/typography/title'

// CORES
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

// ICONS
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EcoIcon from '@material-ui/icons/Eco';

import * as ACTIONTYPE from "./../../js/constants/action-type";
import * as STATUS_TYPE from "../../js/constants/status-type";

import NumberFormat from 'react-number-format';
import PurseAllocationModal from '../modal/PurseAllocationModal';
import YesNoModal from '../modal/YesNoModal';
import InfoModal from '../modal/InfoModal';
import TransferSavingsModal from  '../modal/TransferSavingsModal';
import { Snackbar } from '@material-ui/core';

const { forwardRef, useRef } = React;

function Purse(props){

  console.log("Im in Purse: "+ props.countvisit + " : " + props.action_type)
  const classes = useStyles();

  

  // *** FUNCTIONS *** //
  const passToAddNewAllocation = (iDescription, iAmount)=>{
    props.addNewAllocation(iDescription, iAmount, props);
  };
  const passToAddCashAllocation = (payload, iAmount)=>{
    props.addCashAllocation(payload, iAmount, props);
  };
  const passAgreeSelection = (payload)=>{
    props.deleteAllocation(payload.description, props)
  };
  const passToReleaseAllocationAmount = (payload, iAmount)=>{
    props.releaseAllocationAmount(payload, iAmount, props);
  };


  const closeInfoModal = ()=>{
    props.resetMessageStatus();
  }
  const transferSavings = (iAmount)=>{
    props.purseToVault(iAmount, props);
  }


  // *** MODALS **** //
  const ref = useRef();
  const ChildModal = forwardRef(PurseAllocationModal);
  
  const refYesNo = useRef();
  const ChildModal2 = forwardRef(YesNoModal);

  const refTransferSavings = useRef();
  const ChildModal3 = forwardRef(TransferSavingsModal);



  const [open, setOpen] = React.useState((props.action_type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED? false : true));
  const handleClose = (event, reason) => {
    console.log("to close: " + reason)
    setOpen(false);
  };


  // *** MAIN *** //
  let popmesage = null
  console.log("create snackbar: "+ props.action_type + " : " +  open)
  if( props.action_type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED){
      popmesage = (<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={handleClose}

        message="Transfer Fund Completed"
        key={uuid()}
      />);
  }

  if(props.user.purse){
    const page = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <ChildModal 
              passToAddNewAllocation={passToAddNewAllocation} 
              passToAddCashAllocation={passToAddCashAllocation} 
              passToReleaseAllocationAmount={passToReleaseAllocationAmount}
              ref={ref}/>
  
        <ChildModal2
          passAgreeSelection={passAgreeSelection}
          ref={refYesNo}/>
  
        <ChildModal3
          transferSavings={transferSavings}
          ref ={refTransferSavings}/>
  
        {(props.action_status.purse.status === STATUS_TYPE.STATUS_ERROR )? 
          <InfoModal 
            status={"Error"} 
            message={props.action_status.purse.message} 
            closeInfoModal={closeInfoModal} />: ""}  
  
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
  
            <Typography component="h1" variant="h5">
              {/* {props.app_name} */}
            </Typography>
            
            <Title>Wallet Balance</Title>
            
            <Typography component="p" variant="h4">
             Php <NumberFormat value={props.user.account.balance} displayType={'text'} thousandSeparator={true} />
            </Typography>
  
            <Typography component="p">
              {props.user.account.bankName + " - " + props.user.account.accountNo} 
            </Typography>
            

            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ ()=>ref.current.openAddNewAllocation()}
            >
              Transfer Fund
            </Button>
  
            
            <div> ... </div>
            <div>Breakdown</div>
            <Table size="small">
              <TableBody>
                  {props.user.purse.allocations.map(row => (
                    <TableRow key={uuid()}>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">
                        Php <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} />
                      </TableCell>
                    </TableRow>
                  ))}
                  
              </TableBody>
            </Table>
            
          
        </div>
        {popmesage}
      </Container>
    );
    return page;

  }else{

    const page = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <ChildModal 
              passToAddNewAllocation={passToAddNewAllocation} 
              passToAddCashAllocation={passToAddCashAllocation} 
              passToReleaseAllocationAmount={passToReleaseAllocationAmount}
              ref={ref}/>
  
        <ChildModal2
          passAgreeSelection={passAgreeSelection}
          ref={refYesNo}/>
  
        <ChildModal3
          transferSavings={transferSavings}
          ref ={refTransferSavings}/>
  
        {(props.action_status.purse.status === STATUS_TYPE.STATUS_ERROR )? 
          <InfoModal 
            status={"Error"} 
            message={props.action_status.purse.message} 
            closeInfoModal={closeInfoModal} />: ""}  
  
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
  
            <Typography component="h1" variant="h5">
              {/* {props.app_name} */}
            </Typography>
            
            <Title>Wallet Balance</Title>
            
            <Typography component="p" variant="h4">
              Php <NumberFormat value={props.user.account.balance} displayType={'text'} thousandSeparator={true} />
            </Typography>
  
            <Typography component="p">
              {props.user.account.bankName + " - " + props.user.account.accountNo} 
            </Typography>
            
            
            <Button
              type="button"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ ()=>ref.current.openAddNewAllocation()}
            >
              Add Pocket
            </Button>
  
            
  
        </div>
        {popmesage}
      </Container>
    );
    return page;
  }
  
}



function mapStateToProps(state){
  // console.log(state.countvisit)
  // console.log(state.action_status)
  return state
}

function mapDispatchToProps(dispatch){
  // TODO: CHECK IF VALUE IS GREATER THAN ZERO
  return {
    
      addNewAllocation: (iDescription, iAmount, props)=>{
          const action = {
            type: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD,
            payload: {
              description: iDescription,
              active: true,

              to: "chloe",
              date: new Intl.DateTimeFormat().format(new Date()),
              type: "cash-in",
              donor: "Ninong",
              name: props.user.name,
              remark: iDescription,
              amount: iAmount,
              coins: 10
            },
            authorization: props.authorization,
            user: props.user
          };
          dispatch(action);
      },
      addCashAllocation: (payload, iAmount, props)=>{
        const action = {
          type: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH,
          payload: {
            // id: payload.id,
            description: payload.description,
            amount: payload.amount,
            additionAmmount: iAmount,
            active: payload.active
          },
          authorization: props.authorization,
          user: props.user
        };
        dispatch(action);
      },
      deleteAllocation: (description, props) =>{
        const action = {
          type: ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE,
          payload: {
            // id: iPurseAllocationId
            description: description,
          },
          authorization: props.authorization
        };
        dispatch(action);
      },
      releaseAllocationAmount: (payload, releaseAmount, props)=>{
        const action = {
          type: ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH,
          payload: {
            // id: payload.id,
            description: payload.description,
            amount: payload.amount,
            releaseAmount: releaseAmount,
            active: payload.active
          },
          authorization: props.authorization,
        };
        dispatch(action);
      },
      purseToVault: (iAmount, props)=>{
        const action = {
          type: ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT,
          payload: {
            amount: iAmount
          },
          authorization: props.authorization,
        };
        dispatch(action);
      },
      resetMessageStatus: ()=>{
        const action = {
          type: ACTIONTYPE.MESSAGE_RESET_DEFAULT
        };
        dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purse)
