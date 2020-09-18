import React, { Component } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';

// Mui Stuff
import Grid from '@material-ui/core/grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Add Input component box as first post

class home extends Component {
	state = {
		posts: null,
	};

	componentDidMount() {
		axios
			.get(
				'https://us-central1-gratitudejournal-a722b.cloudfunctions.net/api/posts'
			)
			.then((res) => {
				this.setState({
					posts: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		let recentPostsMarkup = this.state.posts ? (
			this.state.posts.map((post) => {
				return <Post key={post.postId} post={post} />;
			})
		) : (
			<CircularProgress />
		);
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentPostsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

export default home;
