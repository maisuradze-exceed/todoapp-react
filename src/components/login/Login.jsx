import React, { Component } from 'react';
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
import Link from 'react-router-dom/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../styles/Login.css';

export class Login extends Component {
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
								<Link href='#' variant='body2'>
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

export default Login;
