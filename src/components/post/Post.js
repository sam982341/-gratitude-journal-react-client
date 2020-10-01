import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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

// Redux
import { connect } from 'react-redux';

const styles = (styles) => ({
	...styles.global,
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
						<PostDialog
							postId={postId}
							userHandle={userHandle}
							icon={'chat'}
							openDialog={this.props.openDialog}
						/>
						<span>{commentCount} Comments</span>
						<PostDialog
							postId={postId}
							userHandle={userHandle}
							icon={'unfold'}
							openDialog={this.props.openDialog}
						/>
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
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
