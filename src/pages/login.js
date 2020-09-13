import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/pray.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	form: {
		textAlign: 'center',
	},
	appIcon: {
		height: 50,
		margin: '20px auto 20px auto',
	},
	pagetitle: {
		margin: '10px auto 10px auto',
	},
	textField: {
		margin: '10px auto 10px auto',
	},
	button: {
		margin: '20px auto 20px auto',
		position: 'relative',
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10,
	},
	progress: {
		position: 'absolute',
	},
};

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			loading: false,
			errors: {},
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		axios
			.post(
				'https://us-central1-gratitudejournal-a722b.cloudfunctions.net/api/login',
				userData
			)
			.then((res) => {
				console.log(res.data);
				this.setState({
					loading: false,
				});
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					errors: err.response.data,
					loading: false,
				});
			});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="pray" className={classes.appIcon} />
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit={this.handleSubmit} autoComplete="off">
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors.password}
							error={errors.email ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							fullWidth
							disabled={loading}
						>
							Submit
							{loading && (
								<CircularProgress size={20} className={classes.progress} />
							)}
						</Button>
						<small>
							Don't have an account? Sign up <Link to={'/signup'}>Here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
