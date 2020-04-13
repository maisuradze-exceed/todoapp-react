import React, { Component } from 'react';
import TodoItems from './TodoItems';
import { connect } from 'react-redux';
import {
	getTodos,
	checkTodo,
	removeTodo,
	changePage,
} from '../actions/todoActions';
import propTypes from 'prop-types';
class Todo extends Component {
	componentDidMount = () => {
		const { getTodos } = this.props;
		getTodos();
	};

	handleCheck = (event, id) => {
		const { checkTodo } = this.props;
		const checked = {
			isCompleted: event.target.checked,
			id: id,
		};
		checkTodo(checked);
	};

	handleDelete = (id) => {
		const {
			currentPage,
			itemsPerPage,
			todos,
			removeTodo,
			changePage,
		} = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		if (currentItems.length !== 1 || todos.length === 1) {
			removeTodo(id);
		} else {
			removeTodo(id);
			changePage(currentPage - 1);
		}
	};

	render() {
		const { currentPage, itemsPerPage, todos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);

		return (
			<ul className='todos'>
				{todos.length ? (
					<TodoItems
						data={currentItems}
						check={this.handleCheck}
						del={this.handleDelete}
					/>
				) : (
					<h3>No Tasks...</h3>
				)}
			</ul>
		);
	}
}

Todo.propTypes = {
	getTodos: propTypes.func.isRequired,
	checkTodo: propTypes.func.isRequired,
	removeTodo: propTypes.func.isRequired,
	todos: propTypes.array.isRequired,
	currentPage: propTypes.any.isRequired,
	itemsPerPage: propTypes.any.isRequired,
	changePage: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

export default connect(mapStateToProps, {
	getTodos,
	checkTodo,
	removeTodo,
	changePage,
})(Todo);
