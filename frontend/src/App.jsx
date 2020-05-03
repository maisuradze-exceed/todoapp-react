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

//Import from components
import TodoPage from './components/todo/TodoPage';
import Navbar from './components/Navbar';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import LoginFromPlatform from './components/login/LoginFromPlatform';
import { logInUser } from './actions/actions';

//Import from Material UI
import { Container } from '@material-ui/core';

class Application extends Component {
  render() {
    const token = localStorage.getItem('auth-token');
    const { logInUser } = this.props.actions;
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
              component={this.props.isLoggedIn ? TodoPage : redirectNotUser}
              exact
            />
            <Route
              path='/login'
              component={this.props.isLoggedIn ? redirectUser : Login}
              exact
            />
            <Route
              path='/login/api'
              component={
                this.props.isLoggedIn ? redirectUser : LoginFromPlatform
              }
              exact
            />
            <Route
              path='/signup'
              component={this.props.isLoggedIn ? redirectUser : SignUp}
              exact
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const matchDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logInUser }, dispatch),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Application);
