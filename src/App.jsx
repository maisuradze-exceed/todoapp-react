import React, { Component } from 'react';
// import { Todo, Buttons, CreateTodo } from "./components/";
import { Provider } from 'react-redux';
import store from './store/store';
import Todo from './components/Todo';
import Buttons from './components/Buttons';
import CreateTodo from './components/CreateTodo';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<CreateTodo />
				<Todo />
				<Buttons />
			</Provider>
		);
	}
}

export default App;
