import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import * as STATUSTYPE from "../../js/constants/status-type";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'

import { useStyles } from "../../css/dashboard.js"
// import  useStyles  from "../../css/dashboard.js"
import { VIEW_REDIRECT_HOME } from "../../js/constants/action-type";
import Copyright from "../foot/Copyright";
// import LOGO_TIP3 from './../../js/pictures/tip3.png'
import KOALALOGO from './../../js/pictures/koala.png'

function SignIn(props){
  
  const classes = useStyles();
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const triggerSignIn = ()=>{
    if(props.login_status !== STATUSTYPE.QUERY_LOADING)
      props.onLogiIn(username, password);
  }

  const iUsername = (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
      onChange={(evt)=>{ setUsername(evt.target.value) }}
    />
  );

  const iPassword = (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={(evt)=>{ setPassword(evt.target.value) }}
      onKeyDown={(evt)=>{
        if(evt.key == 'Enter'){
          triggerSignIn();
        }
      }}
    />
  );

  const iButton = (<Button
    type="button"
    variant="contained"
    fullWidth
    color="primary"
    className={classes.submit}
    onClick={triggerSignIn}
  >
    Sign In
  </Button>);

  const iErrorMessage = (
    <div>
      {iButton}
      <Typography variant="overline" display="block" gutterBottom>
        {props.login_message}
      </Typography>
    </div>
  );

  const iSuccess = (
    <Typography variant="overline" display="block" gutterBottom>
      {props.login_message}
    </Typography>
  );

  const iLoading = (
    <Typography variant="h5" gutterBottom>
        Loading
      </Typography>
  );

  const triggerButtonView = (props)=>{
    if(props.login_status === STATUSTYPE.QUERY_LOADING){
      return iLoading;
    }else if (props.login_status === STATUSTYPE.QUERY_ERROR){
      return iErrorMessage;
    }else{
      if (props.login_status === STATUSTYPE.QUERY_RESOLVED){
        return iSuccess;
      }else{
        return iButton;
      } 
    }
  }
  const resButton = triggerButtonView(props);

  const page = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper_signin}>
        <Avatar className={classes.avatar} src={KOALALOGO}>
        {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.app_name}
        </Typography>
        <form className={classes.form} noValidate>
          {iUsername}
          {iPassword}
          {resButton}          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  return page;
}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
      onLogiIn: (iUsername, iPassword)=>{
          const action = {
            type: VIEW_REDIRECT_HOME,
            payload: {
              username: iUsername,
              password: iPassword
            }
          };
          dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)