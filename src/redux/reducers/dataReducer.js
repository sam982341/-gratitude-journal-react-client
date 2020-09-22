import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
} from '../types';

const initialState = {
	posts: [],
	post: {},
	loading: false,
};

export default function (state = initialState, actions) {
	switch (actions.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_POSTS:
			return {
				...state,
				posts: actions.payload,
				loading: false,
			};
		case UNLIKE_POST:
		case LIKE_POST:
			let likeIndex = state.posts.findIndex(
				(post) => post.postId === actions.payload.postId
			);
			state.posts[likeIndex] = actions.payload;
			return {
				...state,
			};
		case DELETE_POST:
			let deleteIndex = state.posts.findIndex(
				(post) => post.postId === actions.payload
			);
			state.posts.splice(deleteIndex, 1);
			return {
				...state,
			};
		default:
			return state;
	}
}
