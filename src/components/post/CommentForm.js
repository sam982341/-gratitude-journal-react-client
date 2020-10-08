import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { submitComment } from '../../redux/actions/dataActions';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	formContainer: {
		margin: '30px 20px 10px 20px',
	},
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
		marginBottom: 20,
	},
	commentFormCard: {
		marginTop: 0,
		marginBottom: 0,
		border: '1px solid #cacaca',
		borderRadius: '0px',
		padding: 15,
	},
	inputForm: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
		const {
			classes,
			authenticated,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;

		const commentFormMarkup = authenticated ? (
			<Card className={classes.commentFormCard}>
				<Grid item sm={12} style={{ textAlign: 'center' }}>
					<form
						className={classes.commentInputContainer}
						onSubmit={this.handleSubmitComment}
					>
						<div className={classes.inputForm}>
							<TextField
								label="Comment"
								type="text"
								name="body"
								multiline
								fullWidth
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
							/>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="small"
							className={classes.submitButtom}
							disabled={loading}
						>
							Submit
							{loading && (
								<CircularProgress
									size={30}
									className={classes.progress}
									color="secondary"
								/>
							)}
						</Button>
					</form>
				</Grid>
			</Card>
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
