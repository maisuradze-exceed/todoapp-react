import React, { Component } from 'react';
import TodoPage from './pages/TodoPage';
import { Container } from '@material-ui/core';

class Application extends Component {
	render() {
		return (
			<Container>
				<TodoPage />
			</Container>
		);
	}
}

export default Application;
