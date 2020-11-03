import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DeleteComment from './DeleteComment';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	commentImage: {
		width: 120,
		height: 120,
		transition: '0.3s',
		objectFit: 'cover',
		borderRadius: '50%',
		'@media (max-width: 780px)': {
			width: 60,
			height: 60,
		},
		'&:hover': {
			opacity: 0.8,
		},
	},
	commentData: {
		marginLeft: 20,
	},
	commentContainer: {
		marginBottom: 20,
	},
	contentContainer: {
		width: '80%',
	},
	commentCard: {
		position: 'relative',
		display: 'flex',
		marginBottom: 0,
		marginTop: 0,
		borderRadius: '0px',
		border: '1px solid #cacaca',
		padding: 20,
	},
	userImageContainer: {
		width: '20%',
	},
});

class Comments extends Component {
	render() {
		const {
			classes,
			comments,
			replyHandle,
			user: { authenticated },
		} = this.props;

		const deleteButton = authenticated && this.isUsersPost() && (
			<DeleteComment />
		);

		const commentsMarkup = !comments ? (
			<div className={classes.progressContainerPosts}>
				<CircularProgress size={50} />
			</div>
		) : (
			<Fragment>
				{comments.map((comment, index) => {
					const { body, createdAt, userImage, userHandle } = comment;
					return (
						<Card className={classes.commentCard}>
							<Fragment key={createdAt}>
								<div className={classes.userImageContainer}>
									<img
										src={userImage}
										alt="comment"
										className={classes.commentImage}
									/>
								</div>
								<div className={classes.contentContainer}>
									<div className={classes.commentData}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<Typography
												variant="h5"
												component={Link}
												to={`/users/${userHandle}`}
												className={classes.userHandle}
											>
												@{userHandle}{' '}
											</Typography>
											<Typography
												variant="body2"
												className={classes.timeText}
												style={{ marginLeft: 8, marginTop: 6 }}
											>
												replying to @{replyHandle}
											</Typography>
										</div>
										{deleteButton}
										<Typography variant="body2" className={classes.timeText}>
											{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
										</Typography>
										<Typography variant="body1">{body}</Typography>
									</div>
								</div>
							</Fragment>
						</Card>
					);
				})}
			</Fragment>
		);
		return commentsMarkup;
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Comments));
