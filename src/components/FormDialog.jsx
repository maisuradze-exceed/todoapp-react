import React, { Component } from 'react';
import {
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	Button,
} from '@material-ui/core/';
import Edit from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { editTodo } from '../actions/todoActions';
import propTypes from 'prop-types';

class FormDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newValue: this.props.edit,
			open: false,
		};
	}

	handleClick = () => {
		this.setState({
			newValue: this.props.edit,
			open: !this.state.open,
		});
	};

	handleChange = (event) => {
		this.setState({
			newValue: event.target.value,
		});
	};

	handleSave = () => {
		if (this.state.newValue.trim()) {
			const data = {
				newValue: this.state.newValue.trim(),
				id: this.props.id,
			};
			this.props.editTodo(data);
			this.setState({
				open: false,
			});
		} else {
			this.setState({
				open: false,
			});
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
							inputProps={{ maxLength: 25 }}
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
	editTodo: propTypes.func.isRequired,
};

export default connect(null, { editTodo })(FormDialog);
