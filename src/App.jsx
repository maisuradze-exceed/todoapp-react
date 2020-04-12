import React, { Component } from 'react';
// import { Todo, Buttons, CreateTodo } from "./components/";
import { Provider } from 'react-redux';
import store from './store/store';
import Todo from './components/Todo';
import Buttons from './components/Buttons';
import CreateTodo from './components/CreateTodo';
import { Container } from '@material-ui/core';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Container id='container' maxWidth='md xs'>
					<CreateTodo />
					<div id='todo'>
						<Todo />
					</div>
					<Buttons />
				</Container>
			</Provider>
		);
	}
}

export default App;
