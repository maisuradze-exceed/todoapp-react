// Import from libaries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import from redux
import { changePage } from '../../actions/actions';

class Pagination extends Component {
	handleChange = (number) => {
	  const { actions: { changePage } } = this.props;
	  changePage(number);
	}

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
    {pageNumbers.map((number) => (
      <li key={number} className='pagination'>
        <button onClick={() => this.handleChange(number)} type='button'>
          {number}
        </button>
      </li>
    ))}
  </ul>
	  );
	}
}

Pagination.propTypes = {
  todos: propTypes.arrayOf(propTypes.objectOf({
    _id: propTypes.string,
    isCompleted: propTypes.bool,
    value: propTypes.string,
    user: propTypes.string,
    _v: propTypes.number,
  })).isRequired,
  itemsPerPage: propTypes.number.isRequired,
  actions: propTypes.objectOf({
    changePage: propTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.items,
  itemsPerPage: state.todos.itemsPerPage,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ changePage }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Pagination);
