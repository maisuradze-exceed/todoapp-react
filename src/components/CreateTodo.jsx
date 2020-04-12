import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addTodo, changePage } from '../actions/todoActions';

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
		const post = {
			value: this.state.value,
		};
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexofFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const currentItems = this.props.todos.slice(
			indexofFirstItem,
			indexOfLastItem
		);
		if (currentItems.length === 10) {
			if (this.state.value.trim().length) {
				this.props.addTodo(post);
				this.props.changePage(this.props.currentPage + 1);
			}
			this.setState({
				value: '',
			});
		} else {
			this.state.value.trim().length
				? this.props.addTodo(post)
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
						inputProps={{ maxLength: 25 }}
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
	addTodo: propTypes.func.isRequired,
	changePage: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

export default connect(mapStateToProps, { addTodo, changePage })(CreateTodo);
