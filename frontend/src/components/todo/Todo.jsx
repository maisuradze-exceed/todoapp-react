// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import from redux
import { fetchTodos, checkTodo, deleteTodo } from '../../actions/services';
import { getTodos, changePage } from '../../actions/actions';

// Import from components
import TodoItems from './TodoItems';

class Todo extends Component {
  componentDidMount = () => {
    const {
      actions: { getTodos },
      isLoggedIn,
      token,
    } = this.props;
    if (isLoggedIn) fetchTodos(token).then((res) => getTodos(res));
  };

  handleCheck = (event, id) => {
    const {
      actions: { getTodos },
      token,
      user,
    } = this.props;
    const checked = {
      isCompleted: event.target.checked,
      id,
    };
    checkTodo(checked, token, user).then((res) => getTodos(res));
  };

  handleDelete = (id) => {
    const {
      currentItems,
      currentPage,
      todos,
      token,
      actions: { getTodos, changePage },
    } = this.props;
    if (currentItems.length !== 1 || todos.length === 1) {
      deleteTodo(id, token).then((res) => getTodos(res));
    } else {
      deleteTodo(id, token)
        .then((res) => getTodos(res))
        .then(changePage(currentPage - 1));
    }
  };

  render() {
    const { currentItems, todos } = this.props;
    return (
      <ul className='todos'>
        {todos.length ? (
          <TodoItems
            data={currentItems}
            check={this.handleCheck}
            del={this.handleDelete}
          />
        ) : (
          <h3>No Tasks...</h3>
        )}
      </ul>
    );
  }
}

Todo.propTypes = {
  todos: propTypes.arrayOf(propTypes.oneOfType([propTypes.object])).isRequired,
  currentPage: propTypes.number.isRequired,
  currentItems: propTypes.arrayOf(propTypes.oneOfType([propTypes.object])).isRequired,
  actions: propTypes.objectOf(propTypes.func).isRequired,
  token: propTypes.string.isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  user: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.items,
  currentPage: state.todos.currentPage,
  isLoggedIn: state.user.isLoggedIn,
  token: state.user.token,
  user: state.user.user,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getTodos, changePage }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Todo);
