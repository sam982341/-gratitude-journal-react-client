import React, { Component } from 'react';
import axios from 'axios';
import Post from '../components/Post';

import Grid from '@material-ui/core/grid';

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
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentPostsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<p>Profile</p>
				</Grid>
			</Grid>
		);
	}
}

export default home;
