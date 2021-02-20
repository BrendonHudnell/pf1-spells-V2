import React, { ReactElement, useContext, useMemo } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { ShellLayout } from './shellLayout';
import { AppContext } from '../../components/store';

export function ShellView(): ReactElement {
	const { state } = useContext(AppContext);

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: state.darkMode ? 'dark' : 'light',
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
		[state.darkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ShellLayout />
		</ThemeProvider>
	);
}
