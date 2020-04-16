// Import from libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import from redux
import { logOut } from '../actions/actions';

// Material UI and styles
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons/';
import './styles/Navbar.css';

class Navbar extends React.Component {
	render() {
		const { logOut } = this.props.actions;
		const style = {
			color: 'white',
		};

		const unAuthenticated = (
			<div className='navbtns'>
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
			</div>
		);

		const authenticated = (
			<div className='navbtns'>
				<Link to='/' style={style}>
					<Button className='navbutton' size='large' color='inherit'>
						Tasks
					</Button>
				</Link>

				<Button
					className='navbutton'
					size='large'
					color='inherit'
					onClick={() => logOut(false)}
				>
					Logout
				</Button>
			</div>
		);

		return (
			<AppBar position='static'>
				<Toolbar id='toolbar'>
					<div>
						<Typography variant='h6'>
							<AssignmentTurnedIn />
							Task App
						</Typography>
					</div>
					{this.props.isLoggedIn ? authenticated : unAuthenticated}
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.user.isLoggedIn,
});

const matchDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ logOut }, dispatch),
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
