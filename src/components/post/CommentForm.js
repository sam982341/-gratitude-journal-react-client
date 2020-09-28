import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { submitComment } from '../../redux/actions/dataActions';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	commentInputContainer: {
		width: '100%',
	},
});

class CommentForm extends Component {
	state = {
		body: '',
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '' });
		} else {
			console.log('no');
		}
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmitComment = (event) => {
		event.preventDefault();
		this.props.submitComment(this.props.postId, { body: this.state.body });
	};

	render() {
		const { classes, authenticated } = this.props;
		const { errors } = this.state;

		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{ textAlign: 'center' }}>
				<form
					className={classes.commentInputContainer}
					onSubmit={this.handleSubmitComment}
				>
					<TextField
						autoFocus
						label="Comment on Post"
						type="text"
						name="body"
						multiline
						error={errors.comment ? true : false}
						helperText={errors.comment}
						className={classes.textField}
						value={this.state.body}
						onChange={this.handleChange}
						onKeyPress={(event) => {
							if (event.key === 'Enter') {
								event.preventDefault();
								this.props.submitComment(this.props.postId, {
									body: this.state.body,
								});
							}
						}}
						fullWidth
					/>
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</form>
				<hr className={classes.visibleContainer} />
			</Grid>
		) : (
			<div></div>
		);

		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
});

const mapActionsToProps = {
	submitComment,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(CommentForm));
