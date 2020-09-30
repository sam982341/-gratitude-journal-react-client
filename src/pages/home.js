import React, { Component } from 'react';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import CreatePostForm from '../components/post/CreatePostForm';

// Mui Stuff
import Grid from '@material-ui/core/grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.global,
});

class home extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.data;
		const { classes } = this.props;
		let recentPostsMarkup = !loading ? (
			posts.map((post) => {
				return <Post key={post.postId} post={post} />;
			})
		) : (
			<div className={classes.progressContainerPosts}>
				<CircularProgress />
			</div>
		);
		return (
			<Grid container spacing={10} className={classes.muiGrid}>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
				<Grid item sm={8} xs={12}>
					<CreatePostForm />
					{recentPostsMarkup}
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	classes: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));
