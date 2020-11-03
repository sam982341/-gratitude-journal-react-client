import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import CustomIconButton from '../../util/CustomIconButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';

// Mui Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
	paper: {
		padding: 20,
		position: 'fixed',
		marginTop: 0,
		borderRadius: '0px',
		width: '20%',
		transition: '0.3s',
		//'&:hover': {
		//	background: '#f8ecfa',
		//},
		'@media (max-width: 780px)': {
			position: 'relative',
			width: '90%',
			marginTop: 0,
			padding: 20,
		},
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%',
				'@media (max-width: 780px)': {
					top: '60%',
					left: '57%',
				},
			},
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%',
			'@media (max-width: 780px)': {
				width: 100,
				height: 100,
			},
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle',
			},
			'& a': {
				color: theme.palette.primary.main,
			},
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0',
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px',
		},
	},
	progressContainerProfile: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
});

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};
	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			classes,
			user: {
				credentials: {
					handle,
					createdAt,
					imageUrl,
					bio,
					website,
					location,
					dailyStreak,
				},
				loading,
				authenticated,
			},
		} = this.props;

		let dailyStreakMarkup =
			dailyStreak === 0 ? (
				<Typography variant="body3">
					{dailyStreak} day gratitude streak 🙁
				</Typography>
			) : (
				<Typography variant="body3">
					{dailyStreak} day gratitude streak <span role="img">🔥</span>
				</Typography>
			);

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img src={imageUrl} alt="profile" className="profile-image" />
							<input
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={this.handleImageChange}
							/>
							<CustomIconButton
								onClick={this.handleEditPicture}
								btnClassName={classes.buttons}
								tip="Edit Profile Picture"
							>
								<EditIcon color="primary" />
							</CustomIconButton>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="h5"
							>
								@{handle}
							</MuiLink>
							<hr />
							{dailyStreakMarkup}
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<Fragment>
									<LocationOn color="primary" /> <span>{location}</span>
									<hr />
								</Fragment>
							)}
							{website && (
								<Fragment>
									<LinkIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
									<hr />
								</Fragment>
							)}
							<CalendarToday color="primary" />{' '}
							<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
						</div>
						<EditDetails />
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						Sign Up or Log In
					</Typography>
				</Paper>
			)
		) : (
			<Fragment>
				<div className={classes.progressContainerProfile}>
					<CircularProgress />
				</div>
				{/* <Skeleton variant="rect" width={210} height={400} animation="pulse" /> */}
			</Fragment>
		);

		return profileMarkup;
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));
