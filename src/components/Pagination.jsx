import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changePage } from '../actions/todoActions';

export class Pagination extends Component {
	handleChange = (number) => {
		this.props.changePage(number);
	};
	render() {
		const pageNumbers = [];

		for (
			let i = 1;
			i <= Math.ceil(this.props.todos.length / this.props.itemsPerPage);
			i++
		) {
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
	changePage: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	todos: state.todos.items,
	currentPage: state.todos.currentPage,
	itemsPerPage: state.todos.itemsPerPage,
});

export default connect(mapStateToProps, { changePage })(Pagination);
