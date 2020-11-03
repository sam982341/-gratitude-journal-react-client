import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from '../components/post/LikeButton';
import Comments from '../components/post/Comments';
import DeletePost from '../components/post/DeletePost';
import CommentForm from '../components/post/CommentForm';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
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
		'@media (max-width: 780px)': {
			width: 60,
			height: 60,
		},
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
	bodyContainer: {
		display: 'flex',
	},
	userImageContainer: {
		width: '20%',
	},
	contentContainer: {
		width: '80%',
	},
	expandButton: {
		position: 'absolute',
		right: 0,
		marginRight: '20px',
		color: 'red',
	},
	postLink: {
		'&:hover': {
			backgroundColor: 'grey',
		},
	},
	postCard: {
		position: 'relative',
		display: 'flex',
		marginBottom: 0,
		marginTop: 0,
		borderRadius: '0px',
		border: '1px solid #cacaca',
		transition: '0.3s',
		'@media (max-width: 780px)': {
			paddingTop: 10,
		},
		// '&:hover': {
		// 	backgroundColor: '#f3f3f3',
		// },
	},
	likeCommentContainer: {
		marginLeft: '-15px',
	},
	containerPostPage: {
		marginLeft: '-7px',
		marginRight: '-7px',
	},
	postsContainer: {
		marginTop: 0,
		width: 600,
	},
	commentContainerNew: {
		width: '100%',
	},
	commentFormAndCommentsContainer: {
		paddingTop: 30,
	},
});

class post extends Component {
	componentDidMount() {
		const postId = this.props.match.params.postId;
		this.props.getPost(postId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.postId !== this.props.match.params.postId) {
			const postId = this.props.match.params.postId;
			this.props.getPost(postId);
		}
	}

	isUsersPost = () => {
		if (this.props.user.credentials.handle === this.props.post.userHandle) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const {
			classes,
			user: { authenticated },
			post: {
				postId,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				userHandle,
				comments,
				dailyStreak,
			},
			UI: { loading },
		} = this.props;

		const deleteButton = authenticated && this.isUsersPost() && (
			<DeletePost postId={postId} />
		);

		const dailyStreakMarkup = dailyStreak > 0 && (
			<Typography className={classes.dailyStreakText} variant="body2">
				{dailyStreak} day streak
			</Typography>
		);

		const postMarkup = loading ? (
			<div className={classes.progressContainerPosts}>
				<CircularProgress size={50} />
			</div>
		) : (
			<Fragment>
				<Card className={classes.postCard}>
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
							<div className={classes.handleAndStreak}>
								<Typography
									className={classes.userHandle}
									variant="h6"
									component={Link}
									to={`/users/${userHandle}`}
								>
									{`@${userHandle}`}
								</Typography>
								{dailyStreakMarkup}
							</div>
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
							<div className={classes.likeCommentContainer}>
								<LikeButton postId={postId} />
								<span>{likeCount} Likes</span>
								<IconButton>
									<ChatIcon color="primary" />
								</IconButton>
								<span>{commentCount} Comments</span>
							</div>
						</CardContent>
					</div>
				</Card>
				<div className={classes.commentFormAndCommentsContainer}>
					<CommentForm postId={postId} />
					<div className={classes.commentContainerNew}>
						<Comments comments={comments} replyHandle={userHandle} />
					</div>
				</div>
			</Fragment>
		);

		return (
			<Grid
				container
				spacing={0}
				justify="center"
				className={classes.gridContainer}
			>
				<Grid item sm={8} xs={12} className={classes.postsContainer}>
					<div className={classes.containerPostPage}>{postMarkup}</div>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.data.post,
	UI: state.UI,
	user: state.user,
});

export default connect(mapStateToProps, { getPost })(withStyles(styles)(post));
