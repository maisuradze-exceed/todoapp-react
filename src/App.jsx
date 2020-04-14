import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from './components/Todo';
import Buttons from './components/Buttons';
import CreateTodo from './components/CreateTodo';
import { Container } from '@material-ui/core';
import './App.css';

class App extends Component {
	render() {
		const { itemsPerPage, currentPage, todos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		const todo = todos.some((element) => element.isCompleted === true);
		const checkItems = currentItems.every(
			(element) => element.isCompleted === true
		);
		return (
			<Container id='container' maxWidth='md'>
				<CreateTodo currentItems={currentItems} />
				<Todo currentItems={currentItems} />
				<Buttons
					currentItems={currentItems}
					todo={todo}
					checkItems={checkItems}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

export default connect(mapStateToProps)(App);
