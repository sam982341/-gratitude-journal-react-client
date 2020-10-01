import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	CREATE_POST,
	LOADING_UI,
	CLEAR_ERRORS,
	SET_ERRORS,
	SET_POST,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	SET_PROFILE,
	SET_LAST_VISIBLE,
	SET_POSTS_NEXT,
} from '../types';
import axios from 'axios';

// Get all posts
export const getPosts = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/posts')
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};

// Get first 10 posts
export const getPostsInfinite = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/posts/infinite')
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data,
			});
			dispatch({
				type: SET_LAST_VISIBLE,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};

// Get next 10 posts
export const getPostsInfiniteNext = (lastVisible) => (dispatch) => {
	console.log('get next set of posts running');
	axios
		.post('/posts/infinite/next', lastVisible)
		.then((res) => {
			dispatch({
				type: SET_POSTS_NEXT,
				payload: res.data,
			});
			dispatch({
				type: SET_LAST_VISIBLE,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};

export const getUserPosts = (handle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/users/${handle}/posts`)
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};

export const getUserProfile = (handle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${handle}/profile`)
		.then((res) => {
			dispatch({
				type: SET_PROFILE,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Get one post
export const getPost = (postId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/post/${postId}`)
		.then((res) => {
			dispatch({
				type: SET_POST,
				payload: res.data,
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
};

// Like a post
export const likePost = (postId) => (dispatch) => {
	axios
		.get(`/post/${postId}/like`)
		.then((res) => {
			dispatch({
				type: LIKE_POST,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
	axios
		.get(`/post/${postId}/unlike`)
		.then((res) => {
			dispatch({
				type: UNLIKE_POST,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Delete a post
export const deletePost = (postId) => (dispatch) => {
	axios
		.delete(`/post/${postId}`)
		.then(() => {
			dispatch({
				type: DELETE_POST,
				payload: postId,
			});
		})
		.catch((err) => console.log(err));
};

// Create a post
export const createPost = (newPostData) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/post', newPostData)
		.then((res) => {
			dispatch({
				type: CREATE_POST,
				payload: res.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// Comment on a post
export const submitComment = (postId, newCommentData) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`/post/${postId}/comment`, newCommentData)
		.then((res) => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data,
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// Get a specific user's data
export const getUserData = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/user/${userHandle}`)
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data.posts,
			});
			dispatch({
				type: SET_PROFILE,
				payload: res.data.user,
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: null,
			});
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
