import React, { Component } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
} from '@material-ui/core/';
import Link from 'react-router-dom/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../styles/Login.css';

export class SignUp extends Component {
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
					<form className='form' noValidate>
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

export default SignUp;
