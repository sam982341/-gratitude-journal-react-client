import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CustomIconButton from '../../util/CustomIconButton';
import { createPost, clearErrors } from '../../redux/actions/dataActions';

// Mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

// Mui Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
	},
	inputForm: {
		display: 'flex',
		alignItems: 'center',
	},
	gratefulForText: {
		width: '50%',
		marginTop: 14,
	},
});

class CreatePost extends Component {
	state = {
		open: false,
		body: '',
		errors: {},
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({
			open: false,
			errors: {},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.createPost({ body: this.state.body });
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

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.props.createPost({ body: this.state.body });
		}
	}

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading },
		} = this.props;
		return (
			<Fragment>
				<CustomIconButton tip="New Post" onClick={this.handleOpen}>
					<AddIcon color="primary" />
				</CustomIconButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Create a New Post</DialogTitle>
					<div className={classes.closeButton}>
						<CustomIconButton tip="Close" onClick={this.handleClose}>
							<CloseIcon color="primary" />
						</CustomIconButton>
					</div>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
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
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

CreatePost.propTypes = {
	createPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

const mapActionsToProps = {
	createPost,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(CreatePost));
