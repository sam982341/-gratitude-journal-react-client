import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import lotus from '../../images/lotus.png';
import PropTypes from 'prop-types';
import Notifications from './Notifications';

// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// MUI Drawer
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const styles = {
	leftNav: {
		height: 55,
		width: 55,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: '0.2s',
		borderRadius: '50%',
		'&:hover': {
			background: '#fce8ff',
			borderRadius: '50%',
		},
		position: 'absolute',
		left: '10%',
	},
	imageUrlNav: {
		height: 40,
		width: 40,
		borderRadius: '50%',
		transition: '0.2s',
		'&:hover': {
			opacity: 0.8,
		},
		cursor: 'pointer',
	},
	logo: {
		height: 40,
	},
	signup: {
		margin: '0 10px 0 20px',
	},
	login: {
		margin: '0 0px 0 10px',
	},
	icons: {
		color: 'primary',
	},
	rightNav: {
		position: 'absolute',
		right: '10%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	navContainer: {
		color: '#757575',
		backgroundColor: '#fff',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		'@media (max-width: 780px)': {
			padding: 0,
		},
	},
	list: {
		width: 200,
	},
	listItem: {
		width: '100%',
	},
	listItemIcon: {
		color: 'primary',
	},
	middleNav: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

class Navbar extends Component {
	state = {
		drawerOpen: false,
	};

	handleLogout = () => {
		this.props.logoutUser();
		this.setState({ drawerOpen: false });
	};

	handleDrawerOpen = () => {
		this.setState({ drawerOpen: true });
	};

	handleDrawerClose = () => {
		this.setState({ drawerOpen: false });
	};

	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				authenticated,
				loading,
			},
		} = this.props;

		return (
			<AppBar>
				<Toolbar className={classes.navContainer}>
					{!authenticated ? (
						<Fragment>
							<div className={classes.leftNav}>
								<Link to="/">
									<img className={classes.logo} src={lotus} alt="GRTFL" />
								</Link>
							</div>

							<div className={classes.rightNav}>
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
							</div>
						</Fragment>
					) : !loading ? (
						<Fragment>
							<div className={classes.leftNav}>
								<Link to="/">
									<img className={classes.logo} src={lotus} alt="GRTFL" />
								</Link>
							</div>
							<div className={classes.middleNav}>
								<Notifications />
							</div>
							<div className={classes.rightNav}>
								<img
									src={imageUrl}
									className={classes.imageUrlNav}
									alt=""
									onClick={this.handleDrawerOpen}
								/>
								<Drawer
									onClose={this.handleDrawerClose}
									open={this.state.drawerOpen}
									anchor="right"
								>
									<List className={classes.list}>
										<ListItem
											button
											component={Link}
											to={`/users/${handle}`}
											onClick={this.handleDrawerClose}
										>
											<ListItemIcon>
												<AccountCircleIcon color="primary" />
											</ListItemIcon>
											<ListItemText primary="Profile" />
										</ListItem>
										<ListItem button onClick={this.handleLogout}>
											<ListItemIcon>
												<ExitToAppIcon color="primary" />
											</ListItemIcon>
											<ListItemText primary="Logout" />
										</ListItem>
									</List>
								</Drawer>
							</div>
						</Fragment>
					) : (
						<Fragment>
							<div className={classes.rightNav}>
								<CircularProgress size={15} color="#cacaca" />
							</div>
							<div className={classes.middleNav}>
								<CircularProgress size={15} color="#cacaca" />
							</div>
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
	user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(
	withStyles(styles)(Navbar)
);
