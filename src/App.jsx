import React, { Component } from 'react';
import TodoPage from './components/todo/TodoPage';
import Navbar from './components/Navbar';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Application extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Container>
					<Switch>
						<Route path='/' component={TodoPage} exact />
						<Route path='/login' component={Login} exact />
						<Route path='/signup' component={SignUp} exact />
					</Switch>
				</Container>
			</Router>
		);
	}
}

export default Application;
