import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addTodo } from '../actions/todoActions';

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
		this.state.value.trim().length
			? this.props.addTodo(post)
			: this.setState({
					value: '',
			  });
		this.setState({
			value: '',
		});
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
						value={this.state.value}
						onChange={this.onChange}
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
};

export default connect(null, { addTodo })(CreateTodo);
