import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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
		marginTop: 14,
		marginRight: 8,
		textAlign: 'right',
	},
	formContainer: {
		margin: '10px 20px 10px 20px',
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
			this.setState({ body: '', open: false, errors: {} });
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
			<Card>
				<form onSubmit={this.handleSubmit} className={classes.formContainer}>
					<div className={classes.inputForm}>
						<Typography className={classes.gratefulForText} variant="h5">
							I am grateful for{' '}
						</Typography>
						<TextField
							autoFocus
							id="post"
							label="What are you grateful for?"
							type="text"
							name="body"
							multiline
							placeholder="the beautiful weather!"
							error={errors.body ? true : false}
							helperText={errors.body}
							className={classes.textField}
							onChange={this.handleChange}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									this.props.createPost({ body: this.state.body });
								}
							}}
							fullWidth
						/>
					</div>
					<Button
						type="submit"
						className={classes.submitButton}
						color="primary"
						variant="contained"
						size="small"
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
