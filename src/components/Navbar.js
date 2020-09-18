import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lotus from '../images/lotus.png';

// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

// Mui Icons

const styles = {
	logoContainer: {
		height: 55,
		width: 55,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: '0.3s',
		borderRadius: '50%',
		'&:hover': {
			background: '#fce8ff',
			borderRadius: '50%',
		},
	},
	logo: {
		height: 40,
		margin: '0 10px 0 10px',
	},
	signup: {
		margin: '0 10px 0 5px',
	},
	login: {
		margin: '0 0px 0 10px',
	},
};

class Navbar extends Component {
	render() {
		const { classes } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					<div className={classes.logoContainer}>
						<Link to="/">
							<img className={classes.logo} src={lotus} alt="GRTFL" />
						</Link>
					</div>
					<Button
						component={Link}
						to="/login"
						variant="outlined"
						color="primary"
						size="small"
						className={classes.login}
					>
						Login
					</Button>
					<Button
						component={Link}
						to="/signup"
						color="primary"
						variant="contained"
						size="small"
						className={classes.signup}
					>
						signup
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(Navbar);
