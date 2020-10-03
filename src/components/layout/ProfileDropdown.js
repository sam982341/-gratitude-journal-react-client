import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// Redux

const styles = {
	imageDropdown: {
		height: 40,
		width: 40,
		borderRadius: '50%',
		transition: '0.2s',
		marginRight: 20,
		'&:hover': {
			opacity: 0.8,
		},
	},
};

class ProfileDropdown extends Component {
	state = {
		anchorEl: null,
	};

	handleOpen = (event) => {
		this.setState({ anchorEl: event.target });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const anchorEl = this.state.anchorEl;
		const { classes, imageUrl } = this.props;

		return (
			<Fragment>
				<Tooltip title="Profile">
					<div
						aria-owns={anchorEl ? 'simple-menu' : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						<img
							src={imageUrl}
							alt="profile"
							className={classes.imageDropdown}
						/>
					</div>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpened}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
					<MenuItem onClick={this.handleClose}>Profile</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

export default withStyles(styles)(ProfileDropdown);
