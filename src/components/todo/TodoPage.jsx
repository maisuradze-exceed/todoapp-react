// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import components
import Todo from './Todo';
import Buttons from './Buttons';
import CreateTodo from './CreateTodo';

// Material UI And Styles
import { Container } from '@material-ui/core';
import '../styles/Todo.css';

class App extends Component {
	render() {
		const { itemsPerPage, currentPage, todos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);
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
