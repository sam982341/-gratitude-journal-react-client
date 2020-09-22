import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CustomIconButton from '../util/CustomIconButton';
import { createPost } from '../redux/actions/dataActions';

// Mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

// Mui Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.global,
	closeButton: {
		position: 'absolute',
		left: '91%',
		top: '6%',
	},
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
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
		if (!nextProps.UI.error && !nextProps.UI.loading) {
			this.setState({ body: '' });
			this.handleClose();
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
					<CustomIconButton
						tip="Close"
						onClick={this.handleClose}
						className={classes.closeButton}
					>
						<CloseIcon color="primary" />
					</CustomIconButton>
					<DialogTitle>Create a New Post</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								autoFocus
								id="post"
								label="What are you grateful for?"
								type="text"
								name="body"
								rows="3"
								placeholder="I am grateful for"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button type="submit" className={classes.submitButton}>
								Submit
								{loading && (
									<CircularProgress size={30} className={classes.progress} />
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
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps, { createPost })(
	withStyles(styles)(CreatePost)
);
