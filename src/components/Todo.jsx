import React, { Component } from 'react';
import { Button, Checkbox, TextField, Container } from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';
import FormDialog from './FormDialog';
import axios from 'axios';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      newTodo: '',
      allCompleted: false,
      todos: [],
    };
  }
  componentDidMount = () => {
    axios.get('https://exceed-react.herokuapp.com/list').then((res) =>
      this.setState({
        todos: res.data,
        isLoading: false,
        allCompleted: res.data.every((element) => element.isCompleted === true),
      })
    );
  };

  handleTextChange = (event) => {
    this.setState({
      newTodo: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.newTodo.trim()
      ? axios
          .post('https://exceed-react.herokuapp.com/list', {
            value: this.state.newTodo,
          })
          .then((res) =>
            this.setState({
              todos: res.data,
              newTodo: '',
              allCompleted: res.data.every(
                (element) => element.isCompleted === true
              ),
            })
          )
      : this.setState({
          newTodo: '',
        });
  };

  removeTask = (id) => {
    axios.delete(`https://exceed-react.herokuapp.com/list/${id}`).then((res) =>
      this.setState({
        todos: res.data,
        allCompleted: res.data.every((element) => element.isCompleted === true),
      })
    );
  };

  handleCheckChange = (event, id) => {
    const todos = [...this.state.todos];
    const todo = todos.find((element) => element._id === id);
    todo.isCompleted = event.target.checked;
    this.setState({
      todos,
    });
    axios
      .patch(`https://exceed-react.herokuapp.com/list/${id}`, {
        isCompleted: event.target.checked,
      })
      .then((res) =>
        this.setState({
          todos: res.data,
          allCompleted: res.data.every(
            (element) => element.isCompleted === true
          ),
        })
      );
  };

  allCompleteHandler = () => {
    const ids = this.state.todos.map((element) => element._id);
    this.state.allCompleted
      ? axios
          .patch(`https://exceed-react.herokuapp.com/list/multiple/${ids}`, {
            check: false,
          })
          .then((res) =>
            this.setState({
              todos: res.data,
              allCompleted: false,
            })
          )
      : axios
          .patch(`https://exceed-react.herokuapp.com/list/multiple/${ids}`, {
            check: true,
          })
          .then((res) =>
            this.setState({
              todos: res.data,
              allCompleted: true,
            })
          );
  };

  allRemoveHandler = () => {
    const ids = this.state.todos.map((element) => {
      if (element.isCompleted) {
        return element._id;
      }
      return null;
    });
    axios
      .delete(
        `https://exceed-react.herokuapp.com/list/multiple/${ids.filter(
          Boolean
        )}`
      )
      .then((res) =>
        this.setState({
          todos: res.data,
          allCompleted: res.data.every(
            (element) => element.isCompleted === true
          ),
        })
      );
  };

  editToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <Container maxWidth='md'>
        <div>
          <form id='form' onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.newTodo}
              onChange={this.handleTextChange}
              label='Enter Task'
              id='outlined-size-small'
              variant='outlined'
              size='small'
              autoComplete='off'
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
        {this.state.todos.length ? (
          <div className='buttons'>
            {this.state.allCompleted ? (
              <Button
                variant='outlined'
                className='btn'
                size='large'
                color='primary'
                onClick={this.allCompleteHandler}
              >
                Uncomplete Tasks
              </Button>
            ) : (
              <Button
                variant='contained'
                className='btn'
                size='large'
                color='primary'
                onClick={this.allCompleteHandler}
              >
                Complete Tasks
              </Button>
            )}
            {this.state.todos.some(
              (element) => element.isCompleted === true
            ) ? (
              <Button
                variant='contained'
                className='btn'
                size='large'
                color='secondary'
                onClick={this.allRemoveHandler}
              >
                Remove Completed Tasks
              </Button>
            ) : (
              <Button
                disabled
                variant='contained'
                className='btn'
                size='large'
                color='secondary'
                onClick={this.allRemoveHandler}
              >
                Remove Completed Tasks
              </Button>
            )}
          </div>
        ) : (
          <h1 className='nothing'>No Tasks...</h1>
        )}
        <ul>
          {this.state.todos.map((element) => {
            return (
              <li key={element._id}>
                <Checkbox
                  checked={element.isCompleted}
                  onChange={(event) =>
                    this.handleCheckChange(event, element._id)
                  }
                  color='primary'
                />
                <span className={element.isCompleted ? 'done' : ''}>
                  {element.value}
                </span>
                <div className='btn-div'>
                  <FormDialog data={element} />
                  <Button
                    className='btn-del'
                    id={element._id}
                    onClick={() => this.removeTask(element._id)}
                    variant='contained'
                    color='secondary'
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}

export default Todo;
