import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import { deletePost } from '../redux/actions/dataActions';

// Mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Mui Icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';

const styles = {
	deleteButton: {
		position: 'absolute',
		right: 0,
		marginRight: '20px',
	},
};

class DeletePost extends Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleDeletePost = () => {
		this.props.deletePost(this.props.postId);
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<CustomIconButton
					tip="Delete Post"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutlineIcon color="primary" />
				</CustomIconButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleDeletePost} color="primary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

DeletePost.propTypes = {
	deletePost: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
