// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom/';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Import from redux
import { logInUser } from '../../actions/actions';

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

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: false,
      errorMessage: '',
    };
  }

  handleEmailChange = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  handlePassChange = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  handleConfPassChange = (event) => {
    this.setState({
      ...this.state,
      confirmPassword: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword, email } = this.state;
    const { logInUser } = this.props.actions;

    if (password === confirmPassword) {
      const userData = {
        email: email.toLowerCase(),
        password,
      };
      axios
        .post('https://exceed-react.herokuapp.com/api/auth/register', userData)
        .then(() =>
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
        )
        .catch(() =>
          this.setState({
            email: '',
            password: '',
            confirmPassword: '',
            error: true,
            errorMessage: `Email already exists`,
          })
        );
    } else {
      this.setState({
        ...this.state,
        password: '',
        confirmPassword: '',
        error: true,
        errorMessage: `Passwords didn't match`,
      });
    }
  };
  render() {
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
          {this.state.error ? (
            <Alert severity='error'>{this.state.errorMessage}</Alert>
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
              value={this.state.email}
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
              value={this.state.password}
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
              value={this.state.confirmPassword}
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
            <Grid container>
              <Grid item>
                <Link to='/login' variant='body2'>
                  {'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logInUser }, dispatch),
  };
};

export default connect(null, matchDispatchToProps)(SignUp);
