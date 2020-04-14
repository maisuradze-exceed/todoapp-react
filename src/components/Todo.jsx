import React, { Component } from 'react';
import TodoItems from './TodoItems';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { fetchTodos, checkTodo, deleteTodo } from '../actions/services';
import { getTodos, changePage } from '../actions/actions';

class Todo extends Component {
	componentDidMount = () => {
		const { getTodos } = this.props.actions;
		fetchTodos().then((res) => getTodos(res));
	};

	handleCheck = (event, id) => {
		const { getTodos } = this.props.actions;
		const checked = {
			isCompleted: event.target.checked,
			id: id,
		};
		checkTodo(checked).then((res) => getTodos(res));
	};

	handleDelete = (id) => {
		const { currentPage, itemsPerPage, todos } = this.props;
		const { getTodos, changePage } = this.props.actions;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		if (currentItems.length !== 1 || todos.length === 1) {
			deleteTodo(id).then((res) => getTodos(res));
		} else {
			deleteTodo(id)
				.then((res) => getTodos(res))
				.then(changePage(currentPage - 1));
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
	todos: propTypes.array.isRequired,
	currentPage: propTypes.any.isRequired,
	itemsPerPage: propTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ getTodos, changePage }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Todo);
