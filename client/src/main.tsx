import React, { Fragment, ReactElement, useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Switch,
	Tooltip,
	makeStyles,
	Link,
	Paper,
} from '@material-ui/core';
import { CollapsibleTable, TableData } from './table';
import { SearchParameters } from './parameters';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	footer: {
		top: 'auto',
		bottom: 0,
	},
	paper: {
		paddingBottom: 50,
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

	const [tableData, setTableData] = useState<TableData[] | undefined>(
		undefined
	);

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
							checked={!darkMode}
							onChange={() => changeTheme(!darkMode)}
						/>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Paper className={classes.paper}>
				<SearchParameters onUpdate={setTableData} />
				{tableData ? <CollapsibleTable rowData={tableData} /> : null}
			</Paper>
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
