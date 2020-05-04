// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

// Import from Material UI
import { Container } from '@material-ui/core';

// Import from components
import TodoPage from './components/todo/TodoPage';
import Navbar from './components/Navbar';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import LoginFromPlatform from './components/login/LoginFromPlatform';
import { logInUser } from './actions/actions';

class Application extends Component {
  render() {
    const {
      isLoggedIn,
      actions: { logInUser },
    } = this.props;
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('auth-token');
      } else {
        logInUser({
          token,
          decodedToken,
        });
      }
    }
    const redirectNotUser = () => <Redirect to='/login' />;
    const redirectUser = () => <Redirect to='/' />;
    return (
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route
              path='/'
              component={isLoggedIn ? TodoPage : redirectNotUser}
              exact
            />
            <Route
              path='/login'
              component={isLoggedIn ? redirectUser : Login}
              exact
            />
            <Route
              path='/login/api'
              component={isLoggedIn ? redirectUser : LoginFromPlatform}
              exact
            />
            <Route
              path='/signup'
              component={isLoggedIn ? redirectUser : SignUp}
              exact
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

Application.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
  actions: propTypes.objectOf(propTypes.func).isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logInUser }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Application);
