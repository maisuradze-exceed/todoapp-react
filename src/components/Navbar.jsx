import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AssignmentTurnedIn } from '@material-ui/icons/';
import './styles/Navbar.css';

class Navbar extends React.Component {
	render() {
		const style = {
			color: 'white',
		};

		return (
			<AppBar position='static'>
				<Toolbar id='toolbar'>
					<div>
						<Typography variant='h6'>
							<AssignmentTurnedIn />
							Task App
						</Typography>
					</div>
					<div className='navbtns'>
						<Link to='/' style={style}>
							<Button className='navbutton' size='large' color='inherit'>
								Tasks
							</Button>
						</Link>
						<Link to='/login' style={style}>
							<Button className='navbutton' size='large' color='inherit'>
								Login
							</Button>
						</Link>

						<Link to='/signup' style={style}>
							<Button className='navbutton' size='large' color='inherit'>
								Sign Up
							</Button>
						</Link>
						<Link to='#' style={style}>
							<Button className='navbutton' size='large' color='inherit'>
								Logout
							</Button>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Navbar;
