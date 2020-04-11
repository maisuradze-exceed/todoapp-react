import React, { Component } from 'react';
import { Button, Checkbox, Container } from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';
import FormDialog from './FormDialog';
import { connect } from 'react-redux';
import { getTodos } from '../actions/todoActions';
import propTypes from 'prop-types';

class Todo extends Component {
	componentDidMount = () => {
		this.props.getTodos();
	};

	render() {
		const todos = this.props.todos.map((element) => {
			return (
				<li key={element._id}>
					<Checkbox color='primary' />
					<span className={element.isCompleted ? 'done' : ''}>
						{element.value}
					</span>
					<div className='btn-div'>
						<FormDialog />
						<Button
							className='btn-del'
							id={element._id}
							variant='contained'
							color='secondary'
							startIcon={<Delete />}
						>
							Delete
						</Button>
					</div>
				</li>
			);
		});

		return (
			<Container maxWidth='md'>
				<ul>{todos}</ul>
			</Container>
		);
	}
}

Todo.propTypes = {
	getTodos: propTypes.func.isRequired,
	posts: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
});

export default connect(mapStateToProps, { getTodos })(Todo);
