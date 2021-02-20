import React, { ReactElement, useContext } from 'react';
import {
	AppBar,
	makeStyles,
	Switch,
	Toolbar,
	Tooltip,
	Typography,
} from '@material-ui/core';
import { AppContext } from '../../components/store';

const useStyles = makeStyles({
	spacer: {
		flexGrow: 1,
	},
});

export function ShellHeader(): ReactElement {
	const { state, dispatch } = useContext(AppContext);
	const classes = useStyles();

	function changeTheme(): void {
		if (state.darkMode) {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', 'dark');
		}
		dispatch({ type: 'TOGGLE_DARK_MODE' });
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h1">Pathfinder 1E Spell Search</Typography>

				<div className={classes.spacer} />

				<Tooltip title="Toggle Theme">
					<Switch
						color="default"
						checked={!state.darkMode}
						onChange={() => changeTheme()}
					/>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
}
