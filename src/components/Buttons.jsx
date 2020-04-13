import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from './Pagination';
import {
	deleteTodos,
	completeTodos,
	changePage,
	uncompleteTodos,
} from '../actions/todoActions';

class Buttons extends Component {
	handleRemove = () => {
		const { todos, deleteTodos, changePage } = this.props;
		const ids = [];
		todos.map((element) => {
			if (element.isCompleted) {
				ids.push(element._id);
			}
			return element;
		});
		deleteTodos(ids);
		changePage(1);
	};

	handleComplete = () => {
		const { currentPage, itemsPerPage, todos, completeTodos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		const ids = [];
		currentItems.map((element) => {
			if (!element.isCompleted) {
				ids.push(element._id);
			}
			return null;
		});
		completeTodos(ids);
	};

	handleUncomplete = () => {
		const { currentPage, itemsPerPage, todos, uncompleteTodos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		const ids = [];
		currentItems.map((element) => {
			if (element.isCompleted) {
				ids.push(element._id);
			}
			return null;
		});
		uncompleteTodos(ids);
	};
	render() {
		const { currentPage, itemsPerPage, todos } = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexofFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = todos.slice(indexofFirstItem, indexOfLastItem);
		const todo = todos.some((element) => element.isCompleted === true);
		const checkItems = currentItems.every(
			(element) => element.isCompleted === true
		);

		const count = todos.length;
		const items = (
			<div className='buttons'>
				<Pagination />
				<div id='btns'>
					{!checkItems ? (
						<Button
							variant='outlined'
							className='btn'
							size='large'
							color='primary'
							onClick={this.handleComplete}
						>
							Complete Tasks
						</Button>
					) : (
						<Button
							variant='contained'
							className='btn'
							size='large'
							color='primary'
							onClick={this.handleUncomplete}
						>
							Uncomplete Tasks
						</Button>
					)}
					{todo ? (
						<Button
							variant='contained'
							className='btn'
							size='large'
							color='secondary'
							onClick={this.handleRemove}
						>
							Remove Completed Tasks
						</Button>
					) : (
						<Button
							variant='outlined'
							className='btn'
							size='large'
							color='secondary'
						>
							Remove Completed Tasks
						</Button>
					)}
				</div>
			</div>
		);

		return <div>{count ? items : ''}</div>;
	}
}

Buttons.propTypes = {
	todos: propTypes.array.isRequired,
	currentPage: propTypes.any.isRequired,
	itemsPerPage: propTypes.any.isRequired,
	changePage: propTypes.func.isRequired,
	deleteTodos: propTypes.func.isRequired,
	completeTodos: propTypes.func.isRequired,
	uncompleteTodos: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

export default connect(mapStateToProps, {
	deleteTodos,
	completeTodos,
	changePage,
	uncompleteTodos,
})(Buttons);
