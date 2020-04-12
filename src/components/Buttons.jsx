import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from './Pagination';

class Buttons extends Component {
	render() {
		return (
			<div className='buttons'>
				<div>
					<Pagination />
					<Button
						variant='outlined'
						className='btn'
						size='large'
						color='primary'
					>
						Uncomplete Tasks
					</Button>
				</div>
				<div className='margin-top'>
					<Button
						variant='contained'
						className='btn'
						size='large'
						color='secondary'
					>
						Remove Completed Tasks
					</Button>
				</div>
			</div>
		);
	}
}

Buttons.propTypes = {
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

export default connect(mapStateToProps)(Buttons);
