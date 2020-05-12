import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import InitPage from './initPage';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Phone from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function SignUpPage() {
  const classes = useStyles();

  const back = () => {
    ReactDOM.render(
      <InitPage />,
      document.querySelector('#root')
    );
  };

  const signUp = () => {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    axios.post('/user/signup', {
      Name: name,
      Password: password
    }).then(response => {
      document.querySelector('#msg').innerHTML = 'Create successfully.';
      setTimeout(() => {
        back();
      }, 2000);
    }).catch(error => {
      document.querySelector('#msg').innerHTML = error.response.data;
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Phone />
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
              onClick={() => { signUp(); }}
            >
              Create account
            </Button>
          </div>
          <div>
            <Grid container alignItems="center" direction="column">
              <Grid Item >
                <Link style={{ cursor: "pointer" }} onClick={() => { back(); }} >
                  Back
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
