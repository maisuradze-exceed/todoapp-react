import React, { Component } from 'react';
import { Button, Checkbox, Container } from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';
import FormDialog from './FormDialog';
import Pagination from './Pagination';
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
		this.props.getTodos();
	};

	handleCheck = (event, id) => {
		const checked = {
			isCompleted: event.target.checked,
			id: id,
		};
		this.props.checkTodo(checked);
	};

	handleDelete = (id) => {
		this.props.removeTodo(id);
	};

	render() {
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexofFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const currentItems = this.props.todos.slice(
			indexofFirstItem,
			indexOfLastItem
		);

		const todos = currentItems.map((element) => {
			return (
				<div key={element._id}>
					<li>
						<Checkbox
							color='primary'
							checked={element.isCompleted}
							onChange={(event) => this.handleCheck(event, element._id)}
						/>
						<span className={element.isCompleted ? 'done' : ''}>
							{element.value}
						</span>
						<div className='btn-div'>
							<FormDialog edit={element.value} id={element._id} />
							<Button
								className='btn-del'
								variant='contained'
								color='secondary'
								onClick={() => this.handleDelete(element._id)}
								startIcon={<Delete />}
							>
								Delete
							</Button>
						</div>
					</li>
				</div>
			);
		});

		return (
			<Container maxWidth='md'>
				<ul>
					{this.props.todos.length ? (
						<div>
							{todos}
							<Pagination />
						</div>
					) : (
						'No tasks...'
					)}
				</ul>
			</Container>
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
