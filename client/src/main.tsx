import React, { Fragment, ReactElement, useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Switch,
	Tooltip,
	makeStyles,
	Link,
} from '@material-ui/core';
import { CollapsibleTable } from './table';
import { Parameters } from './parameters';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	footer: {
		top: 'auto',
		bottom: 0,
	},
	title: {
		flexGrow: 1,
	},
});

export interface MainProps {
	darkMode: boolean;
	changeTheme: (isDarkMode: boolean) => void;
}

export function Main(props: MainProps): ReactElement {
	const { darkMode, changeTheme } = props;

	const [tableData, setTableData] = useState([] as Record<string, any>[]);

	const classes = useStyles();

	return (
		<Fragment>
			<AppBar className={classes.root} position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h1">
						Pathfinder 1E Spell Search
					</Typography>
					<Tooltip title="Toggle Theme">
						<Switch
							color="default"
							defaultChecked={!darkMode}
							onChange={() => changeTheme(!darkMode)}
						/>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Parameters onUpdate={setTableData} />
			<CollapsibleTable rowData={tableData} />
			<AppBar className={classes.footer} position="fixed">
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
		</Fragment>
	);
}
