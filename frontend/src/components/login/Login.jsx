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
import Alert from '@material-ui/lab/Alert/Alert';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
  Container,
  Checkbox,
} from '@material-ui/core/';
import '../styles/Login.css';

// Import from redux
import { logInUser } from '../../actions/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    failed: false,
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { actions: { logInUser } } = this.props;
    const userData = {
      email: email.toLowerCase(),
      password,
    };
    axios
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
      })
      .catch(() => this.setState({
        password: '',
        failed: true,
      }));
  };

  render() {
    const { email, failed, password } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <div className='paper'>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
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
          {failed ? (
            <Alert severity='error'>Email or password is incorrect</Alert>
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
              value={email}
              onChange={this.handleEmailChange}
              autoComplete='email'
              autoFocus
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
              onChange={this.handlePasswordChange}
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className='sumbitbtn'
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item>
              <Link to='/signup' variant='body2'>
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  actions: propTypes.objectOf({
    logInUser: propTypes.func,
  }).isRequired,
};

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logInUser }, dispatch),
});

export default connect(null, matchDispatchToProps)(Login);
