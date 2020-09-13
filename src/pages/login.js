import React, { Component } from 'react';

// Mui Elements
import TextField from '@material-ui/core/TextField';

class login extends Component {
	render() {
		return (
			<form noValidate autoComplete="off">
				<TextField id="outlined-basic" label="Email" variant="outlined" />
				<TextField
					id="outlined-secondary"
					label="Password"
					type="password"
					variant="outlined"
					color="primary"
				/>
			</form>
		);
	}
}

export default login;
