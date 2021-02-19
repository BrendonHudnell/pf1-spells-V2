import React, { ReactElement } from 'react';
import {
	AppBar,
	Typography,
	makeStyles,
	Link,
	Container,
} from '@material-ui/core';
import { ShellHeader } from './shellHeader';
import { SpellSearchView } from '../spellSearch';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		paddingBottom: '2em',
	},
	footer: {
		top: 'auto',
		bottom: 0,
		position: 'fixed',
		maxHeight: '2em',
	},
});

export function ShellLayout(): ReactElement {
	const classes = useStyles();

	return (
		<div className={classes.layout}>
			<ShellHeader />
			<Container className={classes.content}>
				<SpellSearchView />
			</Container>
			<AppBar className={classes.footer}>
				<Typography>
					Database sourced from&nbsp;
					<Link
						color="inherit"
						underline="always"
						href="http://home.pathfindercommunity.net/home/databases/spells"
						target="_blank"
						rel="noreferrer"
					>
						pathfindercommunity.net
					</Link>
					. Designed by Brendon Hudnell. 2021
				</Typography>
			</AppBar>
		</div>
	);
}
