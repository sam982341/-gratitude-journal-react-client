import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
		marginTop: 20,
		transition: '0.3s',
		'&:hover': {
			background: '#f8ecfa',
		},
	},
	image: {
		maxWidth: 120,
		height: 120,
		objectFit: 'cover',
		borderRadius: '50%',
		marginTop: 20,
		marginLeft: 20,
		opacity: 1,
		transition: '0.3s',
		'&:hover': {
			opacity: 0.8,
		},
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
	userHandle: {
		color: '#757575',
		transition: '0.3s',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	gratefulTextStart: {
		color: '#707070',
	},
	gratefulbody: {
		//color: '#7e208f',
	},
	bodyContainer: {
		display: 'flex',
	},
	timeText: {
		color: '#cacaca',
		marginBottom: 5,
	},
	userImageContainer: {
		width: '20%',
	},
	contentContainer: {
		width: '80%',
	},
};

class Post extends Component {
	likedPost = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.postId === this.props.post.postId
			)
		) {
			return true;
		} else {
			return false;
		}
	};

	isUsersPost = () => {
		if (this.props.user.credentials.handle === this.props.post.userHandle) {
			return true;
		} else {
			return false;
		}
	};

	handleLikePost = () => {
		this.props.likePost(this.props.post.postId);
	};

	handleUnlikePost = () => {
		this.props.unlikePost(this.props.post.postId);
	};

	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			user: {
				authenticated,
				credentials: { handle },
			},
			post: {
				body,
				createdAt,
				userImage,
				userHandle,
				postId,
				likeCount,
				commentCount,
			},
		} = this.props;

		const deleteButton = authenticated && this.isUsersPost() && (
			<DeletePost postId={postId} />
		);

		return (
			<Card className={classes.card}>
				<div className={classes.userImageContainer}>
					<CardMedia
						image={userImage}
						title="Profile Image"
						className={classes.image}
						component={Link}
						to={`/users/${userHandle}`}
					/>
				</div>
				<div className={classes.contentContainer}>
					<CardContent className={classes.content}>
						<Typography
							className={classes.userHandle}
							variant="h6"
							component={Link}
							to={`/users/${userHandle}`}
						>
							{`@${userHandle}`}
						</Typography>
						{deleteButton}
						<Typography className={classes.timeText} variant="body2">
							{dayjs(createdAt).fromNow()}
						</Typography>
						<Typography variant="body1">
							<span className={classes.gratefulTextStart}>
								I am grateful for{' '}
							</span>
							<span className={classes.gratefulbody}>{body}</span>
						</Typography>
						<LikeButton postId={postId} />
						<span>{likeCount} Likes</span>
						<CustomIconButton tip="Comments">
							<ChatIcon color="primary" />
						</CustomIconButton>
						<span>{commentCount} Comments</span>
						<PostDialog postId={postId} userHandle={userHandle} />
					</CardContent>
				</div>
			</Card>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
