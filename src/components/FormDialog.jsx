import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Edit from '@material-ui/icons/Edit';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: this.props.data.value,
      id: this.props.data._id,
      save: this.props.save(),
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
              onClick={() => {
                this.state.value.trim().length
                  ? this.state.save(this.state.id, this.state.value)
                  : this.setState({ value: this.props.data.value });
                this.setState({ open: false });
              }}
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
