import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import CustomIconButton from '../../util/CustomIconButton';
import DeletePost from './DeletePost';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

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
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
	profileImage: {
		maxWidth: 150,
		height: 150,
		padding: '10px 0 10px 0',
		borderRadius: '50%',
		objectFit: 'cover',
		'@media (max-width: 780px)': {
			maxWidth: 75,
			height: 75,
			marginRight: 15,
		},
	},
	dialogBox: {
		padding: 20,
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		'@media (max-width: 780px)': {
			left: '88%',
		},
	},
	progressContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 170,
	},
	expandButton: {
		position: 'absolute',
		right: 0,
		marginRight: '20px',
		'@media (max-width: 780px)': {
			display: 'none',
		},
	},
	chatButton: {},
	postDialogContent: {
		padding: '15px 0 15px 0',
		'@media (max-width: 780px)': {
			padding: 0,
		},
	},
});

class PostDialog extends Component {
	state = {
		open: false,
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}

	handleOpen = () => {
		this.setState({ open: true });
		this.props.getPost(this.props.postId);
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			icon,
			classes,
			post: {
				postId,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				userHandle,
				comments,
			},
			UI: { loading },
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.progressContainer}>
				<CircularProgress size={50} />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={4}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={8} className={classes.postDialogContent}>
					<Typography
						className={classes.userHandle}
						variant="h6"
						component={Link}
						to={`/users/${userHandle}`}
					>
						{`@${userHandle}`}
					</Typography>
					<Typography variant="body2" className={classes.timeText}>
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">
						<span className={classes.gratefulTextStart}>
							I am grateful for{' '}
						</span>
						<span className={classes.gratefulbody}>{body}</span>
					</Typography>
					<LikeButton postId={postId} />
					<span>{likeCount} likes</span>
					<CustomIconButton tip="Comments">
						<ChatIcon color="primary" />
					</CustomIconButton>
					<span>{commentCount} Comments</span>
				</Grid>
				<hr className={classes.visibleSeparator} />
				<CommentForm postId={postId} />
				<Comments comments={comments} />
			</Grid>
		);

		const iconMarkup =
			icon === 'unfold' ? (
				<CustomIconButton
					onClick={this.handleOpen}
					tip="Expand Post"
					tipClassName={classes.expandButton}
				>
					<UnfoldMoreIcon color="primary" />
				</CustomIconButton>
			) : (
				<CustomIconButton
					onClick={this.handleOpen}
					tip="Comments"
					tipClassName={classes.chatButton}
				>
					<ChatIcon color="primary" />
				</CustomIconButton>
			);

		return (
			<Fragment>
				{iconMarkup}
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
					<DialogContent className={classes.dialogBox}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
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
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(PostDialog));
