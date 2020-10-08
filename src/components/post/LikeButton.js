import React, { Component } from 'react';
import CustomIconButton from '../../util/CustomIconButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

// MUI Icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';

export class LikeButton extends Component {
	likedPost = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find((like) => like.postId === this.props.postId)
		) {
			return true;
		} else {
			return false;
		}
	};
	handleLikePost = (e) => {
		e.preventDefault();
		this.props.likePost(this.props.postId);
	};

	handleUnlikePost = (e) => {
		e.preventDefault();
		this.props.unlikePost(this.props.postId);
	};
	render() {
		const { authenticated } = this.props.user;
		const likeButtonMarkup = !authenticated ? (
			<Link to="/login">
				<CustomIconButton tip="Like">
					<FavoriteBorderIcon color="primary" />
				</CustomIconButton>
			</Link>
		) : this.likedPost() ? (
			<CustomIconButton tip="Unlike" onClick={this.handleUnlikePost}>
				<FavoriteIcon color="primary" />
			</CustomIconButton>
		) : (
			<CustomIconButton tip="Like" onClick={this.handleLikePost}>
				<FavoriteBorderIcon color="primary" />
			</CustomIconButton>
		);

		return likeButtonMarkup;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likePost,
	unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
