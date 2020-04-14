import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from './Pagination';
import { bindActionCreators } from 'redux';
import { getTodos, changePage } from '../actions/actions';
import {
	deleteAllTodo,
	completeAllTodo,
	uncompleteAllTodo,
} from '../actions/services';

class Buttons extends Component {
	handleRemove = () => {
		const { todos } = this.props;
		const { getTodos, changePage } = this.props.actions;
		const ids = [];
		todos.map((element) => {
			if (element.isCompleted) {
				ids.push(element._id);
			}
			return element;
		});
		deleteAllTodo(ids)
			.then((res) => getTodos(res))
			.then(changePage(1));
	};

	handleComplete = () => {
		const { currentPage, itemsPerPage, todos } = this.props;
		const { getTodos } = this.props.actions;
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
		completeAllTodo(ids).then((res) => getTodos(res));
	};

	handleUncomplete = () => {
		const { currentPage, itemsPerPage, todos } = this.props;
		const { getTodos } = this.props.actions;
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
		uncompleteAllTodo(ids).then((res) => getTodos(res));
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

export default connect(mapStateToProps, matchDispatchToProps)(Buttons);
