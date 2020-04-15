// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Import from redux
import { getTodos } from '../../actions/actions';
import { editTodo } from '../../actions/services';

// Material UI
import {
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	Button,
} from '@material-ui/core/';
import Edit from '@material-ui/icons/Edit';

class FormDialog extends Component {
	state = {
		newValue: this.props.edit,
		open: false,
	};

	handleClick = () => {
		const { edit } = this.props;
		this.setState({
			newValue: edit,
			open: !this.state.open,
		});
	};

	handleChange = (event) => {
		this.setState({
			newValue: event.target.value,
		});
	};

	handleSave = () => {
		const { id } = this.props;
		const { getTodos } = this.props.actions;
		const close = () =>
			this.setState({
				open: false,
			});
		const data = {
			newValue: this.state.newValue,
			id: id,
		};
		if (this.state.newValue.trim()) {
			editTodo(data).then((res) => getTodos(res));
			close();
		} else {
			close();
		}
	};
	render() {
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
					open={this.state.open}
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
							value={this.state.newValue}
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
	actions: propTypes.object.isRequired,
	edit: propTypes.string.isRequired,
	id: propTypes.string.isRequired,
};

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ getTodos }, dispatch),
	};
};

export default connect(null, matchDispatchToProps)(FormDialog);
