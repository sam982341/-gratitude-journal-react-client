import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

//MUI
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import { SignalCellularNullSharp } from '@material-ui/icons';

const styles = (theme) => ({
	...theme.global,
});

class user extends Component {
	state = {
		profile: null,
		postIdParam: null,
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		const postId = this.props.match.params.postId;

		if (postId) this.setState({ postIdParam: postId });

		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then((res) => {
				this.setState({
					profile: res.data.user,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const { posts, loading } = this.props.data;
		const { classes } = this.props;
		const { postIdParam } = this.state;

		const userPostsMarkup = loading ? (
			<div className={classes.progressContainerPosts}>
				<CircularProgress />
			</div>
		) : posts === null ? (
			<p>No Posts</p>
		) : (
			posts.map((post) => {
				return <Post key={post.postId} post={post} />;
			})
		);

		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{userPostsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<div className={classes.progressContainerPosts}>
							<CircularProgress />
						</div>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
	withStyles(styles)(user)
);
