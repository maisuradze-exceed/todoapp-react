// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import from redux
import { fetchTodos, checkTodo, deleteTodo } from '../actions/services';
import { getTodos, changePage } from '../actions/actions';

// Import from components
import TodoItems from './TodoItems';

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
		const {
			currentItems,
			currentPage,
			todos,
			actions: { getTodos, changePage },
		} = this.props;
		if (currentItems.length !== 1 || todos.length === 1) {
			deleteTodo(id).then((res) => getTodos(res));
		} else {
			deleteTodo(id)
				.then((res) => getTodos(res))
				.then(changePage(currentPage - 1));
		}
	};

	render() {
		const { currentItems, todos } = this.props;
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
	currentPage: propTypes.number.isRequired,
	currentItems: propTypes.array.isRequired,
	actions: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ getTodos, changePage }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Todo);
