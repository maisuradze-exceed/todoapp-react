import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changePage } from '../actions/actions';

export class Pagination extends Component {
	handleChange = (number) => {
		const { changePage } = this.props.actions;
		changePage(number);
	};
	render() {
		const pageNumbers = [];
		const { todos, itemsPerPage } = this.props;

		for (let i = 1; i <= Math.ceil(todos.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}
		return (
			<ul
				className='mainpag'
				style={{
					display: 'flex',
					marginRight: 60,
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 10,
				}}
			>
				{pageNumbers.map((number) => {
					return (
						<li key={number} className='pagination'>
							<button onClick={() => this.handleChange(number)}>
								{number}
							</button>
						</li>
					);
				})}
			</ul>
		);
	}
}

Pagination.propTypes = {
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
		actions: bindActionCreators({ changePage }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Pagination);
