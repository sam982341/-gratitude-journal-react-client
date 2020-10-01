import React, { Component, Fragment } from 'react';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import CreatePostForm from '../components/post/CreatePostForm';

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
});

class home extends Component {
	state = {
		scrolling: false,
	};

	componentDidMount() {
		//this.props.getPostsInfinite();
		this.props.getPosts();
		//window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		//window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (e) => {
		console.log('scrolling');
		const { scrolling } = this.state;
		if (scrolling) return;
		const lastElement = document.getElementById('scrollEnd');
		const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 100;
		if (pageOffset > lastElementOffset - bottomOffset) this.onButtonClick();
	};

	onButtonClick = () => {
		this.props.getPostsInfiniteNext({
			lastVisible: this.props.data.lastVisible,
		});
	};

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
			<Fragment>
				<Grid container spacing={10} className={classes.gridContainer}>
					<Grid item sm={4} xs={12}>
						<Profile />
					</Grid>
					<Grid item sm={8} xs={12}>
						<CreatePostForm />
						{recentPostsMarkup}
					</Grid>
				</Grid>
				{/* <hr id="scrollEnd" /> */}
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
