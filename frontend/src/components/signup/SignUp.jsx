// Import from libraries
import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom/';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

// Material UI and Styles
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert/Alert';
import '../styles/Login.css';

// Import from redux
import { logInUser } from '../../actions/actions';

class SignUp extends Component {
    state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: false,
      errorMessage: '',
    }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePassChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleConfPassChange = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const clear = () => {
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        error: true,
        errorMessage: 'Email already exists',
      });
    };
    event.preventDefault();
    const { actions: { logInUser } } = this.props;
    const { password, confirmPassword, email } = this.state;

    if (password === confirmPassword) {
      const userData = {
        email: email.toLowerCase(),
        password,
      };
      axios
        .post('https://exceed-react.herokuapp.com/api/auth/register', userData)
        // Change This code
        .then(() => axios
          .post('https://exceed-react.herokuapp.com/api/auth/login', userData)
          .then((res) => {
            localStorage.setItem('auth-token', `${res.data}`);
            axios.defaults.headers.common['auth-token'] = res.data;
          })
          .then(() => {
            const token = localStorage.getItem('auth-token');
            const decodedToken = jwtDecode(token);
            logInUser({
              token,
              decodedToken,
            });
          }))
        .catch(() => clear());
    } else {
      clear();
    }
  };

  render() {
    const {
      error, errorMessage, email, password, confirmPassword,
    } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className='paper'>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create New Account
          </Typography>
          <a
            className='socialbtns'
            href='https://exceed-react.herokuapp.com/api/otherlogin/auth/facebook'
          >
            <FacebookLoginButton className='socialbtns' />
          </a>
          <a
            className='socialbtns'
            href='https://exceed-react.herokuapp.com/api/otherlogin/auth/github'
          >
            <GithubLoginButton className='socialbtns' />
          </a>
          <a
            className='socialbtns'
            href='https://exceed-react.herokuapp.com/api/otherlogin/auth/google'
          >
            <GoogleLoginButton className='socialbtns' />
          </a>
          {error ? (
            <Alert severity='error'>{errorMessage}</Alert>
          ) : null}
          <form className='form' onSubmit={this.handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={this.handleEmailChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={this.handlePassChange}
              inputProps={{ minLength: 6 }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='repeatPassword'
              label='Repeat Password'
              type='password'
              id='repeatPassword'
              value={confirmPassword}
              onChange={this.handleConfPassChange}
              inputProps={{ minLength: 6 }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className='sumbitbtn'
            >
              Sign Up
            </Button>
          </form>
          <Grid container>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  actions: propTypes.objectOf({
    logInUser: propTypes.func,
  }).isRequired,
};

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logInUser }, dispatch),
});

export default connect(null, matchDispatchToProps)(SignUp);
