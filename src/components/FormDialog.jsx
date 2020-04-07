import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Edit from '@material-ui/icons/Edit';
import axios from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: this.props.data.value,
      id: this.props.data._id,
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  hadleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSave = (id) => {
    axios
      .patch(`https://exceed-react.herokuapp.com/list/single/${id}`, {
        value: this.state.value,
      })
      .then(
        this.setState({
          open: false,
        })
      );
  };

  render() {
    return (
      <div>
        <Button
          className='btn-del'
          variant='contained'
          onClick={this.handleToggle}
          color='primary'
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby='form-dialog-title'
        >
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Edit'
              type='text'
              autoComplete='off'
              fullWidth
              onChange={this.hadleChange}
              value={this.state.value}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleSave(this.state.id)}
              color='primary'
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
