// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

//Import from components
import TodoPage from './components/todo/TodoPage';
import Navbar from './components/Navbar';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

//Import from Material UI
import { Container } from '@material-ui/core';

class Application extends Component {
	render() {
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

export default connect(mapStateToProps)(Application);
