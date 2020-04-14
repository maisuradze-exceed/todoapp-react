// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Import from redux
import { addTodo } from '../actions/services';
import { getTodos, changePage } from '../actions/actions';

// Material UI
import { TextField, Button } from '@material-ui/core';

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
		const {
			currentItems,
			currentPage,
			actions: { getTodos, changePage },
		} = this.props;
		const post = this.state.value.trim();
		const clear = () => this.setState({ value: '' });
		if (currentItems.length === 10) {
			if (this.state.value.trim().length) {
				addTodo(post)
					.then((res) => getTodos(res))
					.then(changePage(currentPage + 1));
			}
			clear();
		} else {
			this.state.value.trim().length
				? addTodo(post).then((res) => getTodos(res))
				: clear();
			clear();
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateTodo);
