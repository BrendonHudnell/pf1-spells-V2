import React, { useMemo, useState } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { Main } from './main';

export function App() {
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem('theme') === 'dark'
	);

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: darkMode ? 'dark' : 'light',
				},
				typography: {
					button: {
						textTransform: 'none',
					},
					h1: {
						fontSize: '2rem',
						fontWeight: 'bold',
					},
					h2: {
						fontSize: '1.8rem',
						fontWeight: 'bold',
					},
					h3: {
						fontSize: '1.5rem',
						fontWeight: 'bold',
					},
					h4: {
						fontSize: '1.25rem',
						fontWeight: 'bold',
					},
				},
			}),
		[darkMode]
	);

	function changeTheme(darkMode: boolean) {
		if (darkMode) {
			localStorage.setItem('theme', 'dark');
		} else {
			localStorage.removeItem('theme');
		}
		setDarkMode(darkMode);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Main darkMode={darkMode} changeTheme={changeTheme} />
		</ThemeProvider>
	);
}
