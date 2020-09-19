import { makeStyles } from '@material-ui/core/styles';
import {Colors} from './colors.js'

export const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    // submit: {
    //   margin: theme.spacing(3, 0, 2),
    // },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: Colors.Violet
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: Colors.Violet,
      "&:hover": {
        background: Colors.DarkViolet
      },
    },
  }));
  
  