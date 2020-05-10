import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUpPage from './signUpPage';
import ChatPage from './chatPage';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Chat from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © ChatChat '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function InitPage() {
  const classes = useStyles();

  const signUp = () => {
    ReactDOM.render(
      <SignUpPage />,
      document.querySelector('#root')
    );
  }

  const signIn = () => {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    axios.post('/user/signin', {
      Name: name,
      Password: password
    }).then(response => {
      console.log(response.data);
      ReactDOM.render(
        <ChatPage user_name={name} jwtToken={response.data}/>,
        document.querySelector('#root')
      );
    }).catch(error => {
      document.querySelector('#msg').innerHTML = error.response.data;
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Chat />
        </Avatar>
        <Typography variant="h5">
          Chat Chat
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Account"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
          />
          <div style={{ padding: 10 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => { signIn(); }}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Grid container alignItems="center" direction="column">
              <Grid Item >
                <Link style={{ cursor: "pointer" }} onClick={() => { signUp(); }} >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid Item >
                <Typography 
                  align="center"
                  variant="body2"
                  color="secondary"
                  id="msg"
                >
                </Typography>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </Container>
  );
}
