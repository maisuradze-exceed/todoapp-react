// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Material UI
import { TextField, Button } from '@material-ui/core';

// Import from redux
import { addTodo } from '../../actions/services';
import { getTodos, changePage } from '../../actions/actions';

class CreateTodo extends Component {
  state = {
    value: '',
  };

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      currentItems,
      currentPage,
      token,
      user,
      actions: { getTodos, changePage },
    } = this.props;
    const { value } = this.state;
    const post = value.trim();
    const clear = () => this.setState({ value: '' });
    if (currentItems.length === 10) {
      if (post.length) {
        addTodo(post, token, user)
          .then((res) => getTodos(res, user))
          .then(changePage(currentPage + 1))
          .then(clear());
      }
    } else if (post.length) {
      addTodo(post, token, user).then((res) => getTodos(res, user));
    } else {
      clear();
    }
    clear();
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <form id='form' onSubmit={this.handleSubmit}>
          <TextField
            label='Enter Task'
            id='outlined-size-small'
            variant='outlined'
            size='small'
            autoComplete='off'
            inputProps={{ maxLength: 30 }}
            value={value}
            onChange={this.onChange}
            required
          />
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            type='submit'
          >
            Add Task
          </Button>
        </form>
      </div>
    );
  }
}

CreateTodo.propTypes = {
  currentPage: propTypes.number.isRequired,
  currentItems: propTypes.arrayOf(propTypes.objectOf({
    _id: propTypes.string,
    isCompleted: propTypes.bool,
    value: propTypes.string,
    user: propTypes.string,
    _v: propTypes.number,
  })).isRequired,
  actions: propTypes.objectOf({
    getTodos: propTypes.func,
    changePage: propTypes.func,
  }).isRequired,
  token: propTypes.string.isRequired,
  user: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.items,
  currentPage: state.todos.currentPage,
  token: state.user.token,
  user: state.user.user,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getTodos, changePage }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(CreateTodo);
