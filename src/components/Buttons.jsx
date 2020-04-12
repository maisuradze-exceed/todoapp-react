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
		const ids = [];
		this.props.todos.map((element) => {
			if (element.isCompleted) {
				ids.push(element._id);
			}
			return element;
		});
		this.props.deleteTodos(ids);
		this.props.changePage(1);
	};

	handleComplete = () => {
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexofFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const currentItems = this.props.todos.slice(
			indexofFirstItem,
			indexOfLastItem
		);
		const ids = [];
		currentItems.map((element) => {
			if (!element.isCompleted) {
				ids.push(element._id);
			}
			return null;
		});
		this.props.completeTodos(ids);
	};

	handleUncomplete = () => {
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexofFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const currentItems = this.props.todos.slice(
			indexofFirstItem,
			indexOfLastItem
		);
		const ids = [];
		currentItems.map((element) => {
			if (element.isCompleted) {
				ids.push(element._id);
			}
			return null;
		});
		this.props.uncompleteTodos(ids);
	};
	render() {
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexofFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const currentItems = this.props.todos.slice(
			indexofFirstItem,
			indexOfLastItem
		);
		const todos = this.props.todos.some(
			(element) => element.isCompleted === true
		);
		const checkItems = currentItems.every(
			(element) => element.isCompleted === true
		);

		const count = this.props.todos.length;
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
					{todos ? (
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
