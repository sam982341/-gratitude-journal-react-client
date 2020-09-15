import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
	card: {
		display: 'flex',
		marginBottom: 20,
		marginTop: 20,
		'&:hover': {
			background: '#f1f0f0',
		},
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: '50%',
		marginTop: 10,
		marginLeft: 15,
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
	userHandle: {
		color: '#757575',
	},
	gratefulText: {
		color: '#7e208f',
	},
	bodyContainer: {
		display: 'flex',
	},
};

class Post extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
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
		return (
			<Card className={classes.card} component={Link} to="/post/postId">
				<CardMedia
					image={userImage}
					title="Profile Image"
					className={classes.image}
					component={Link}
					to={`/users/${userHandle}`}
				/>
				<CardContent className={classes.content}>
					<Typography
						className={classes.userHandle}
						variant="h6"
						component={Link}
						to={`/users/${userHandle}`}
					>
						{`@${userHandle}`}
					</Typography>
					<Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
					<Typography variant="body1">{body}</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(Post);
