// Import from libraries
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// Material UI and styles
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons/';
import './styles/Navbar.css';

// Import from redux
import { logOut } from '../actions/actions';

class Navbar extends Component {
  render() {
    const { isLoggedIn, actions: { logOut } } = this.props;
    const style = {
      color: 'white',
    };

    const unAuthenticated = (
      <div className='navbtns'>
        <Link to='/login' style={style}>
          <Button className='navbutton' size='large' color='inherit'>
            Login
          </Button>
        </Link>

        <Link to='/signup' style={style}>
          <Button className='navbutton' size='large' color='inherit'>
            Sign Up
          </Button>
        </Link>
      </div>
    );

    const authenticated = (
      <div className='navbtns'>
        <Link to='/' style={style}>
          <Button className='navbutton' size='large' color='inherit'>
            Tasks
          </Button>
        </Link>

        <Button
          className='navbutton'
          size='large'
          color='inherit'
          onClick={() => {
            localStorage.removeItem('auth-token');
            logOut();
          }}
          style={{ textDecoration: 'underline' }}
        >
          Logout
        </Button>
      </div>
    );

    return (
      <AppBar position='static'>
        <Toolbar id='toolbar'>
          <div>
            <Typography variant='h6'>
              <AssignmentTurnedIn />
              Task App
            </Typography>
          </div>
          {isLoggedIn ? authenticated : unAuthenticated}
        </Toolbar>
      </AppBar>
    );
  }
}


Navbar.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
  actions: propTypes.objectOf(propTypes.func).isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logOut }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
