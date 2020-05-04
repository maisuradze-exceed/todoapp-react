// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import from Components
import { Button } from '@material-ui/core';
import Pagination from './Pagination';

// Import from redux
import { getTodos, changePage } from '../../actions/actions';
import {
  deleteAllTodo,
  completeAllTodo,
  uncompleteAllTodo,
} from '../../actions/services';

// Material UI

class Buttons extends Component {
  handleRemove = () => {
    const {
      todos,
      token,
      actions: { getTodos, changePage },
    } = this.props;
    const ids = [];
    todos.map((element) => {
      if (element.isCompleted) {
        ids.push(element._id);
      }
      return element;
    });
    deleteAllTodo(ids, token)
      .then((res) => getTodos(res))
      .then(changePage(1));
  };

  handleComplete = () => {
    const {
      currentItems,
      token,
      user,
      actions: { getTodos },
    } = this.props;
    const ids = [];
    currentItems.map((element) => {
      if (!element.isCompleted) {
        ids.push(element._id);
      }
      return null;
    });
    completeAllTodo(ids, token, user).then((res) => getTodos(res));
  };

  handleUncomplete = () => {
    const {
      currentItems,
      token,
      user,
      actions: { getTodos },
    } = this.props;
    const ids = [];
    currentItems.map((element) => {
      if (element.isCompleted) {
        ids.push(element._id);
      }
      return null;
    });
    uncompleteAllTodo(ids, token, user).then((res) => getTodos(res));
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
  todos: propTypes.arrayOf(propTypes.object).isRequired,
  todo: propTypes.bool.isRequired,
  currentItems: propTypes.arrayOf(propTypes.object).isRequired,
  actions: propTypes.objectOf(propTypes.func).isRequired,
  checkItems: propTypes.bool.isRequired,
  token: propTypes.string.isRequired,
  user: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.items,
  token: state.user.token,
  user: state.user.user,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getTodos, changePage }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Buttons);
