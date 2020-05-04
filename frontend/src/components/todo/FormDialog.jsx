// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Material UI
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core/';
import Edit from '@material-ui/icons/Edit';

// Import from redux
import { getTodos } from '../../actions/actions';
import { editTodo } from '../../actions/services';

class FormDialog extends Component {
  constructor(props) {
    super(props);
    const { edit } = this.props;
    this.state = {
      newValue: edit,
      open: false,
    };
  }

  handleClick = () => {
    const { open } = this.state;
    const { edit } = this.props;
    this.setState({
      newValue: edit,
      open: !open,
    });
  };

  handleChange = (event) => {
    this.setState({
      newValue: event.target.value,
    });
  };

  handleSave = () => {
    const {
      id,
      token,
      user,
      actions: { getTodos },
    } = this.props;
    const { newValue } = this.state;
    const close = () => this.setState({
      open: false,
    });
    const data = {
      newValue,
      id,
    };
    if (newValue.trim()) {
      editTodo(data, token, user).then((res) => getTodos(res, user));
      close();
    } else {
      close();
    }
  };

  render() {
    const { open, newValue } = this.state;
    return (
      <div>
        <Button
          className='btn-del'
          variant='contained'
          color='primary'
          size='small'
          startIcon={<Edit />}
          onClick={() => this.handleClick()}
        >
          Edit
        </Button>
        <Dialog
          aria-labelledby='form-dialog-title'
          open={open}
          onClose={this.handleClick}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Edit'
              type='text'
              inputProps={{ maxLength: 30 }}
              autoComplete='off'
              fullWidth
              value={newValue}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={this.handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  actions: propTypes.objectOf(propTypes.func).isRequired,
  edit: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  token: propTypes.string.isRequired,
  user: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getTodos }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(FormDialog);
