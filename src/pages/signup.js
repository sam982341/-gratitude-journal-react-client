import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lotus from '../images/lotus.png';
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

const styles = (theme) => ({
	...theme.global,
});

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			loading: false,
			errors: {},
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		};
		axios
			.post(
				'https://us-central1-gratitudejournal-a722b.cloudfunctions.net/api/signup',
				newUserData
			)
			.then((res) => {
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
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
					<img src={lotus} alt="pray" className={classes.appIcon} />
					<Typography variant="h2" className={classes.pageTitle}>
						Signup
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
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="handle"
							name="handle"
							type="text"
							label="Handle"
							className={classes.textField}
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={this.state.handle}
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
							Already have an account? Log in <Link to={'/login'}>Here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(signup);
