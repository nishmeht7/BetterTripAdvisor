import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import queryString from 'query-string';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Nish\'s Travel Advisor '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUpPage extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      pwdOkay: false,
      displayError: false,
      userExists: false
    }
  }

  handleUsername = e => {
    e.preventDefault();
    this.setState({ username: e.target.value })
  }

  handlePassword = e => {
    e.preventDefault();
    this.setState({ password: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    let isTrue = false;
    const { username, password } = this.state;
    let regex = new RegExp("^(?=. [a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
    if(username !== "") {
      console.log("username is", username);
      console.log("the password is, ", password);
      let n = password.length;
      if(n >= 5 && n <= 10) {
        console.log("password len: ", n)
        if(regex.test(password)) {
          isTrue = true;
        }
      }
    }

    if(isTrue) {
      console.log("works!!");
      this.setState({ pwdOkay: true })
      this.registerUser();
    }
    else {
      console.log("noo!!!")
      this.setState({ displayError: true })
    }
  }

  registerUser = () => {
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      username: this.state.username,
      password: this.state.password
    })

    fetch('http://localhost:8090/signup', {
     method: 'POST',
     headers: headers,
     body: query
    })
    .then(res => {
      console.log("the response is: ", res)
      if(res.ok) return res.json();
    })
    .then(json => {
      let { message, success } = json;
      console.log("message: ", message)
      let userObj = {
          username: this.state.username,
          userId: message
        }
      if(success) {
        this.props.cookies.set('user', userObj)
        this.props.history.push('/home')
      }
      else if(message === "username") this.setState({ userExists: true })
    })
    .catch(err => {
      console.log("error while signing user up ", err)
    })
  }

  render() {
    let { displayError, userExists } = this.state;
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  onChange={this.handleUsername}
                  error={userExists}
                />
                {userExists && 
                  <InputLabel htmlFor="component-error">Username exists</InputLabel>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                  error={displayError}
                />
                {displayError && 
                  <InputLabel htmlFor="component-error">Make sure your password contains a letter, a number and a special character</InputLabel>
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUpPage)
