import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import Profile from '../components/profile/Profile';
import { Waypoint } from 'react-waypoint';

//MUI
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import {
	getUserPosts,
	getUserProfile,
	getUserPostsNext,
} from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
});

class user extends Component {
	componentDidMount() {
		const handle = this.props.match.params.handle;
		this.props.getUserPosts(handle);
		this.props.getUserProfile(handle);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.handle !== this.props.match.params.handle) {
			const handle = nextProps.match.params.handle;
			this.props.getUserPosts(handle);
			this.props.getUserProfile(handle);
		}
	}

	handleEnter = () => {
		const handle = this.props.match.params.handle;
		this.props.getUserPostsNext(handle, {
			lastVisible: this.props.data.lastVisible,
		});
	};

	render() {
		const {
			posts,
			loading,
			profile: { user },
			loadingMorePosts,
		} = this.props.data;
		const { credentials } = this.props.user;
		const { classes } = this.props;

		const userPostsMarkup = !loading ? (
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

		const userProfileMarkup = !user ? (
			<div className={classes.progressContainerPosts}>
				<CircularProgress />
			</div>
		) : loading ? (
			<div className={classes.progressContainerPosts}>
				<CircularProgress />
			</div>
		) : user.handle === credentials.handle ? (
			<Profile />
		) : (
			<StaticProfile user={user} />
		);

		return (
			<Grid container spacing={10}>
				<Grid item sm={4} xs={12}>
					{userProfileMarkup}
				</Grid>
				<Grid item sm={8} xs={12}>
					{userPostsMarkup}
					{loadingMorePosts && (
						<div className={classes.progressContainerPosts}>
							<CircularProgress />
						</div>
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
	user: state.user,
});

const mapActionsToProps = {
	getUserPosts,
	getUserProfile,
	getUserPostsNext,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(user));
