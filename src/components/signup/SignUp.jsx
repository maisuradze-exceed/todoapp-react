// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom/';

// Import from redux
import { createUser } from '../../actions/actions';

// Material UI and Styles
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert/Alert';
import '../styles/Login.css';

export class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			error: false,
			errorMessage: '',
			users: this.props.users,
		};
	}

	handleEmailChange = (event) => {
		this.setState({
			...this.state,
			email: event.target.value,
		});
	};

	handlePassChange = (event) => {
		this.setState({
			...this.state,
			password: event.target.value,
		});
	};

	handleConfPassChange = (event) => {
		this.setState({
			...this.state,
			confirmPassword: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { password, confirmPassword, email, users } = this.state;
		const { createUser } = this.props.actions;
		if (password === confirmPassword) {
			users.map((user) => {
				if (user.email === email) {
					this.setState({
						...this.state,
						email: '',
						password: '',
						confirmPassword: '',
						error: true,
						errorMessage: 'Account already exists',
					});
				}
				return null;
			});
			if (this.state.error) {
				const users = [...this.state.users];
				users.push({
					email: this.state.email,
					password: this.state.password,
				});
				createUser(users);
			}
			setTimeout(() => {
				this.setState({
					error: false,
				});
			}, 3000);
		} else {
			this.setState({
				...this.state,
				password: '',
				confirmPassword: '',
				error: true,
				errorMessage: `Passwords didn't match`,
			});
			setTimeout(() => {
				this.setState({
					error: false,
				});
			}, 3000);
		}
	};
	render() {
		return (
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className='paper'>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Create New Account
					</Typography>
					{this.state.error ? (
						<Alert severity='error'>{this.state.errorMessage}</Alert>
					) : null}
					<form className='form' onSubmit={this.handleSubmit}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							value={this.state.password}
							onChange={this.handlePassChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='repeatPassword'
							label='Repeat Password'
							type='password'
							id='repeatPassword'
							value={this.state.confirmPassword}
							onChange={this.handleConfPassChange}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className='sumbitbtn'
						>
							Sign Up
						</Button>
						<Grid container>
							<Grid item>
								<Link to='/login' variant='body2'>
									{'Already have an account? Sign in'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.user.users,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ createUser }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);
