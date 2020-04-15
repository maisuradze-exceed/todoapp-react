// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

// Import from Components
import Pagination from './Pagination';

// Import from redux
import { getTodos, changePage } from '../../actions/actions';
import {
	deleteAllTodo,
	completeAllTodo,
	uncompleteAllTodo,
} from '../../actions/services';

// Material UI
import { Button } from '@material-ui/core';

class Buttons extends Component {
	handleRemove = () => {
		const {
			todos,
			actions: { getTodos, changePage },
		} = this.props;
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
		const {
			currentItems,
			actions: { getTodos },
		} = this.props;
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
		const {
			currentItems,
			actions: { getTodos },
		} = this.props;
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
		const { todos, todo, checkItems } = this.props;

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
	todo: propTypes.bool.isRequired,
	currentItems: propTypes.array.isRequired,
	actions: propTypes.object.isRequired,
	checkItems: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ getTodos, changePage }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Buttons);
