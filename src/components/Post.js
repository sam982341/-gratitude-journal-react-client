import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import DeletePost from './DeletePost';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../redux/actions/dataActions';

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
		width: 120,
		height: 120,
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

	handleDeletePost = () => {
		this.props.deletePost(this.props.post.postId);
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

		const likeButton = !authenticated ? (
			<CustomIconButton tip="Like">
				<Link to="/login">
					<FavoriteBorderIcon color="primary" />
				</Link>
			</CustomIconButton>
		) : this.likedPost() ? (
			<CustomIconButton tip="Unike" onClick={this.handleUnlikePost}>
				<FavoriteIcon color="primary" />
			</CustomIconButton>
		) : (
			<CustomIconButton tip="Like" onClick={this.handleLikePost}>
				<FavoriteBorderIcon color="primary" />
			</CustomIconButton>
		);

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
						{likeButton}
						<span>{likeCount} Likes</span>
						<CustomIconButton tip="Comments">
							<ChatIcon color="primary" />
						</CustomIconButton>
						<span>{commentCount} Comments</span>
					</CardContent>
				</div>
			</Card>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likePost,
	unlikePost,
	deletePost,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Post));
