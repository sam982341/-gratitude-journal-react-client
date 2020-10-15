import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../../util/CustomIconButton';
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
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

// Redux
import { connect } from 'react-redux';
import { StayPrimaryLandscape } from '@material-ui/icons';

// Dayjs
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const styles = (styles) => ({
	...styles.global,
	image: {
		width: 120,
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
		'&:hover': {
			background: '#faf0fc',
		},
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
});

class Post extends Component {
	isUsersPost = () => {
		if (this.props.user.credentials.handle === this.props.post.userHandle) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			user: { authenticated },
			post: {
				body,
				createdAt,
				userImage,
				userHandle,
				postId,
				likeCount,
				commentCount,
				dailyStreak,
			},
		} = this.props;

		const deleteButton = authenticated && this.isUsersPost() && (
			<DeletePost postId={postId} />
		);

		const dailyStreakMarkup = dailyStreak > 0 && (
			<Typography className={classes.dailyStreakText} variant="body2">
				{dailyStreak} day streak
			</Typography>
		);

		return (
			<Link to={`/posts/${postId}`}>
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
									{`@${userHandle}`}{' '}
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
								<PostDialog
									postId={postId}
									userHandle={userHandle}
									icon={'chat'}
									openDialog={this.props.openDialog}
								/>
								<span>{commentCount} Comments</span>
							</div>
						</CardContent>
					</div>
				</Card>
			</Link>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
