import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import { useStyles } from "../../css/dashboard";
import { VIEW_REDIRECT_PURSE, VIEW_REDIRECT_VAULT } from '../../js/constants/action-type';

import EcoIcon from '@material-ui/icons/Eco';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Grid from '@material-ui/core/Grid';
import TipsModal from './../modal/TipsModal'

//logs
import LOGO_MERCHANT1 from './../../js/pictures/merchant1.png'
import LOGO_MERCHANT2 from './../../js/pictures/merchant2.png'
import LOGO_MERCHANT3 from './../../js/pictures/merchant3.png'
import LOGO_MERCHANT4 from './../../js/pictures/merchant4.png'
import LOGO_MERCHANT5 from './../../js/pictures/merchant5.png'
import LOGO_MERCHANT6 from './../../js/pictures/merchant6.png'
import LOGO_MERCHANT7 from './../../js/pictures/merchant7.png'
import LOGO_MERCHANT8 from './../../js/pictures/merchant8.png'

import LOGO_TIP1 from './../../js/pictures/tip1.png'
import LOGO_TIP2 from './../../js/pictures/tip2.png'
import LOGO_TIP3 from './../../js/pictures/tip3.png'

const { forwardRef, useRef } = React;


function buildMainControlPanel(props, classes){
  const mainpanel = (
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
          
          <Typography component="p" variant="h4">
            Hi {props.user.name}!
          </Typography>

          {(props.user.status === "new")?
          (<Typography component="p" variant="subtitle1">
            New Account
          </Typography>)
          :(<Typography component="p" variant="subtitle1">
            Coins: {props}
          </Typography>)}
          

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large" 
            onClick={props.onPurse}
          >
            
            <AccountBalanceWalletIcon/>
            <Typography component="p" variant="h6">Wallet | Php <NumberFormat value={props.user.account.balance} displayType={'text'} thousandSeparator={true} /></Typography>
          </Button>
      </div>
      
  )
  return mainpanel  
}





// INBOX LIST
let counter = 0;
function getId(){
  counter = counter + 1;
  return counter;
}
function trimMessageText(textMessage){
  const limit = 50;
  if(textMessage.length>limit){
    return (textMessage.substring(0, limit)+"...")
  }else{
    return textMessage
  }
}


function builcTipsPanel2(props, classes, ref, ChildModal){
  if(props.user.tips && props.user.tips.length>0){

    let len = props.user.tips.length - 1;
    let maxToShow = 4;
    let counter = 0;

    let buttonsToShow = []
    for( let c = 0; c<maxToShow && len>=0 ; c++, len--){
      const tipItem = props.user.tips[len];

      if(tipItem.details){
        const buttonx = (
          <Button 
            key={c} 
            className={classes.imgtips}
            onClick={()=>ref.current.openDialog(tipItem)}
            >
            <Typography component="p" variant="body2">
              {trimMessageText(tipItem.details)}
            </Typography>
          </Button> 
        )
        buttonsToShow.push(buttonx)
      }
    }

    const mainpanel = (
      <div className={classes.papertips}>
            
            <Typography component="p" variant="h6">
              Notification
            </Typography>
            <Grid container spacing={3}>
              {buttonsToShow.map(elem=>(
                <Grid item xs={3} key={getId()}>
                  {elem}
                </Grid>
              ))}
            </Grid>
        </div>
    )
    return mainpanel
  }else{
    return (<div></div>)
  }
}

function buildAffiliateMerchants(props, classes){
  if(props.user.tips && props.user.tips.length>0){

    const mainpanel = (
      <div className={classes.papertips}>
            
            <Typography component="p" variant="h6">
              Affiliate Merchants
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button>
                  <img src={LOGO_MERCHANT1} alt="Logo" className={classes.img}/>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button>
                  <img src={LOGO_MERCHANT2} alt="Logo" className={classes.img}/>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button>
                  <img src={LOGO_MERCHANT3} alt="Logo" className={classes.img}/>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button>
                  <img src={LOGO_MERCHANT4} alt="Logo" className={classes.img}/>
                </Button>
              </Grid>
            </Grid>
            
        </div>
    )

    return mainpanel 
    
  }else{
    return (<div></div>)
  }
}


function Dashboard(props){
  const classes = useStyles();

  const ref = useRef();
  const ChildModal = forwardRef(TipsModal);

  const mainControlsPanel = buildMainControlPanel(props, classes);
  const tipsPanel = builcTipsPanel2(props, classes, ref, ChildModal);
  const merchantsPanel = buildAffiliateMerchants(props, classes);

  const mainpage = (

  
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <ChildModal ref={ref}/>

      <Container  maxWidth="xs">
        {mainControlsPanel}
      </Container>
      <Container  maxWidth="lg">
        {tipsPanel}
      </Container>
      <Container  maxWidth="lg">
        {merchantsPanel}
      </Container>
    </Container>
    

    );
  
  return mainpage
}



function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    onPurse: ()=>{
        const action = {type: VIEW_REDIRECT_PURSE};
        dispatch(action);
    },

    onVault: ()=>{
      const action = {type: VIEW_REDIRECT_VAULT};
      dispatch(action);
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

