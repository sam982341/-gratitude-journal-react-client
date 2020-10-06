import React, { Component, Fragment } from 'react';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import CreatePostForm from '../components/post/CreatePostForm';
import { Waypoint } from 'react-waypoint';

// Mui Stuff
import Grid from '@material-ui/core/grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';
import {
	getPosts,
	getPostsInfinite,
	getPostsInfiniteNext,
} from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
	gridContainer: {
		'@media (max-width: 780px)': {
			padding: 10,
		},
	},
	postsContainer: {
		marginTop: 20,
	},
	homeProfile: {
		'@media (max-width: 780px)': {
			display: 'none',
		},
	},
});

class home extends Component {
	componentDidMount() {
		this.props.getPostsInfinite();
	}

	handleEnter = () => {
		this.props.getPostsInfiniteNext({
			lastVisible: this.props.data.lastVisible,
		});
	};

	render() {
		const { posts, loading, loadingMorePosts } = this.props.data;
		const { classes } = this.props;
		let recentPostsMarkup = !loading ? (
			<div>
				{posts.map((post) => {
					return <Post key={post.postId} post={post} />;
				})}
				<Waypoint onEnter={this.handleEnter} />
			</div>
		) : (
			<div className={classes.progressContainerPosts}>
				<CircularProgress />
			</div>
		);
		return (
			<Fragment>
				<Grid container spacing={10} className={classes.gridContainer}>
					<Grid item sm={4} xs={12} className={classes.homeProfile}>
						<Profile />
					</Grid>
					<Grid item sm={8} xs={12} className={classes.postsContainer}>
						<CreatePostForm />
						{recentPostsMarkup}
						{loadingMorePosts && (
							<div className={classes.progressContainerPosts}>
								<CircularProgress />
							</div>
						)}
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

home.propTypes = {
	classes: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	getPostsInfinite: PropTypes.func.isRequired,
	getPostsInfiniteNext: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getPostsInfinite,
	getPostsInfiniteNext,
	getPosts,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(home));
