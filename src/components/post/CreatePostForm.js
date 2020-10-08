import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

// Redux
import { createPost, clearErrors } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
		marginBottom: 20,
	},
	inputForm: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	gratefulForText: {
		width: '40%',
		marginTop: 12,
		marginRight: 8,
		textAlign: 'right',
	},
	formContainer: {
		margin: '30px 20px 10px 20px',
	},
	inputAdornment: {
		marginBottom: 2,
	},
	createPostCard: {
		marginTop: 0,
		marginBottom: 0,
		border: '1px solid #cacaca',
		borderRadius: '0px',
	},
});

class CreatePostForm extends Component {
	state = {
		body: '',
		errors: {},
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.createPost({ body: this.state.body });
		this.setState({ body: '' });
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			});
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '', errors: {} });
		}
	}

	render() {
		const {
			classes,
			authenticated,
			UI: { loading },
		} = this.props;

		const { errors } = this.state;

		let createPostMarkup = authenticated && (
			<Card className={classes.createPostCard}>
				<Grid item sm={12} style={{ textAlign: 'center' }}>
					<form
						noValidate
						onSubmit={this.handleSubmit}
						className={classes.formContainer}
						autoComplete="off"
					>
						<div className={classes.inputForm}>
							<TextField
								id="new"
								name="body"
								type="text"
								label="What are you grateful for?"
								className={classes.textField}
								helperText={errors.body}
								error={errors.body ? true : false}
								value={this.state.body}
								onChange={this.handleChange}
								fullWidth
								multiline
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											className={classes.inputAdornment}
										>
											I am grateful for
										</InputAdornment>
									),
								}}
								onKeyPress={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault();
										this.props.createPost({ body: this.state.body });
										this.setState({ body: '' });
									}
								}}
							/>
						</div>
						<Button
							type="submit"
							className={classes.submitButton}
							color="primary"
							variant="contained"
							size="small"
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
		);

		return createPostMarkup;
	}
}

CreatePostForm.propTypes = {
	createPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	UI: state.UI,
});

const mapActionsToProps = {
	createPost,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(CreatePostForm));
