import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import DeletePost from './DeletePost';
import LikeButton from './LikeButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// MUI Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
	invisibleSeparator: {
		border: 'none',
		margin: 4,
	},
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover',
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
	},
	progressContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
	},
	expandButton: {
		position: 'absolute',
		right: 0,
		marginRight: '20px',
	},
});

class PostDialog extends Component {
	state = {
		open: false,
	};
	handleOpen = () => {
		this.setState({ open: true });
		this.props.getPost(this.props.postId);
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {
			classes,
			post: {
				postId,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				userHandle,
			},
			UI: { loading },
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.progressContainer}>
				<CircularProgress size={50} />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={5}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7}>
					<Typography
						component={Link}
						color="Primary"
						variant="h5"
						to={`users/${userHandle}`}
					>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body2" color="grey">
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">{body}</Typography>
					<LikeButton postId={postId} />
					<span>{likeCount} likes</span>
					<CustomIconButton tip="Comments">
						<ChatIcon color="primary" />
					</CustomIconButton>
					<span>{commentCount} Comments</span>
				</Grid>
			</Grid>
		);

		return (
			<Fragment>
				<CustomIconButton
					onClick={this.handleOpen}
					tip="Expand Post"
					tipClassName={classes.expandButton}
				>
					<UnfoldMoreIcon color="primary" />
				</CustomIconButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					className={classes.dialogContainer}
				>
					<div className={classes.closeButton}>
						<CustomIconButton tip="Close" onClick={this.handleClose}>
							<CloseIcon color="primary" />
						</CustomIconButton>
					</div>
					<DialogContent className={classes.DialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostDialog.propTypes = {
	getPost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.data.post,
	UI: state.UI,
});

const mapActionsToProps = {
	getPost,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(PostDialog));