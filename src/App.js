import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Mui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#9c27b0',
		},
		secondary: {
			main: '#e1bee7',
		},
	},
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
							<Route exact path="/login" component={login} />
							<Route exact path="/signup" component={signup} />
						</Switch>
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
