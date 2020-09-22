import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import lotus from '../images/lotus.png';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import CreatePost from './CreatePost';

// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';

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
	icons: {
		color: 'primary',
	},
};

class Navbar extends Component {
	render() {
		const { classes, authenticated } = this.props;

		return (
			<AppBar>
				<Toolbar className="nav-container">
					{!authenticated ? (
						<Fragment>
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
						</Fragment>
					) : (
						<Fragment>
							<div className={classes.logoContainer}>
								<Link to="/">
									<img className={classes.logo} src={lotus} alt="GRTFL" />
								</Link>
							</div>
							<CreatePost />
							<CustomIconButton tip="Notifications">
								<NotificationsIcon color="primary" />
							</CustomIconButton>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
