import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addTodo } from '../actions/services';
import { bindActionCreators } from 'redux';
import { getTodos, changePage } from '../actions/actions';

class CreateTodo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	onChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { currentPage, itemsPerPage, todos } = this.props;
		const post = this.state.value;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		const { getTodos, changePage } = this.props.actions;

		if (currentItems.length === 10) {
			if (this.state.value.trim().length) {
				addTodo(post)
					.then((res) => getTodos(res))
					.then(changePage(currentPage + 1));
			}

			this.setState({
				value: '',
			});
		} else {
			this.state.value.trim().length
				? addTodo(post).then((res) => getTodos(res))
				: this.setState({
						value: '',
				  });
			this.setState({
				value: '',
			});
		}
	};

	render() {
		return (
			<div>
				<form id='form' onSubmit={this.handleSubmit}>
					<TextField
						label='Enter Task'
						id='outlined-size-small'
						variant='outlined'
						size='small'
						autoComplete='off'
						inputProps={{ maxLength: 30 }}
						value={this.state.value}
						onChange={this.onChange}
						required
					/>
					<Button
						color='primary'
						variant='outlined'
						size='medium'
						type='submit'
					>
						Add Task
					</Button>
				</form>
			</div>
		);
	}
}

CreateTodo.propTypes = {
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateTodo);
