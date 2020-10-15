export default {
	palette: {
		primary: {
			main: '#7e208f',
		},
		secondary: {
			main: '#e1bee7',
		},
	},
	global: {
		progressContainerPosts: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 60,
		},
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
		closeButton: {
			position: 'absolute',
			left: '91%',
			top: '6%',
		},
		gratefulTextStart: {
			color: '#707070',
		},
		gratefulbody: {
			//color: '#7e208f',
		},
		timeText: {
			color: '#cacaca',
			marginBottom: 5,
		},
		userHandle: {
			color: '#757575',
			transition: '0.3s',
			'&:hover': {
				textDecoration: 'underline',
			},
		},
		card: {
			position: 'relative',
			display: 'flex',
			marginBottom: 0,
			marginTop: 0,
			borderRadius: '0px',
			border: '1px solid #cacaca',
			//transition: '0.3s',
			//'&:hover': {
			//	background: '#f8ecfa',
			//},
			'@media (max-width: 780px)': {
				paddingTop: 10,
			},
		},
		invisibleSeparator: {
			border: 'none',
			margin: 4,
		},
		visibleSeparator: {
			width: '100%',
			border: '1px solid rbga(0,0,0,0.05)',
			marginBottom: 20,
			marginTop: 20,
		},
		handleAndStreak: {
			display: 'flex',
			alignItems: 'center',
		},
		dailyStreakText: {
			marginLeft: 6,
			color: '#e1b5ff',
		},
	},
};
