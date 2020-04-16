// Import from libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom/';

// Import from redux
import { logInUser } from '../../actions/actions';

// Material UI and Styles
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Grid,
	Box,
	Typography,
	Container,
	Checkbox,
} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert/Alert';
import '../styles/Login.css';

export class Login extends Component {
	state = {
		email: '',
		password: '',
		failed: false,
	};

	handleEmailChange = (event) => {
		this.setState({
			...this.state,
			email: event.target.value,
		});
	};

	handlePasswordChange = (event) => {
		this.setState({
			...this.state,
			password: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {
			users,
			actions: { logInUser },
		} = this.props;
		users.map((user) => {
			if (
				user.email === this.state.email &&
				user.password === this.state.password
			) {
				logInUser(true);
			} else {
				this.setState({
					email: '',
					password: '',
					failed: true,
				});
			}
			setTimeout(() => {
				this.setState({
					...this.state,
					failed: false,
				});
			}, 4000);
			return null;
		});
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
						Sign in
					</Typography>
					{this.state.failed ? (
						<Alert severity='error'>Email or password is incorrect</Alert>
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
							value={this.state.email}
							onChange={this.handleEmailChange}
							autoComplete='email'
							autoFocus
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
							onChange={this.handlePasswordChange}
							autoComplete='current-password'
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className='sumbitbtn'
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to='/signup' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}></Box>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.user.users,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ logInUser }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
