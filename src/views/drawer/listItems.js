import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom'
import * as URL_LIST from "../../js/constants/url-list";

// ICONS
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EcoIcon from '@material-ui/icons/Eco';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as AUTHENTICATION from './../../js/actions/authentication-manager'
import * as RedirectManager from './../../js/actions/redirect-manager'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


function getMessageIcon(inbox){
  let comp = (<MessageIcon />)
  if(inbox && inbox.length>0){
    let count = 0
    const len = inbox.length;
    for( let i = 0; i<len; i++){
      if(!inbox[i].open){
        count += 1
      }
    }
    comp = (<Badge badgeContent={count} color="secondary">
        <MessageIcon />
    </Badge>)
  }
  return comp
}

function triggerLogout(){
  console.log("logout")
  AUTHENTICATION.removeAuthorization()
  RedirectManager.redirectToLogin()
}

//error
export const mainfunction = (props)=>{
  let inbox = [];
  if(props.user && props.user.inbox){
    inbox = props.user.inbox
  }
  
  const mainListItems = 
      (
        <div>
          {/* <Link to={URL_LIST.URL_USER_HOME}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home"  />
            </ListItem>
          </Link> */}
    
          <Link to={URL_LIST.URL_USER_PURSE}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItem>
          </Link>

          <Link to={"/"}> 
          <ListItem button onClick={()=>{triggerLogout()}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          </Link>
        </div>
      );
  return mainListItems
} 
   
