import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { tableList } from './parameterTypes';

// TODO:
// - add pagination
// - add sorting

export interface TableProps {
	rowData: Record<string, string>[];
}

// function handleSort(sortKey: string) {
// 	const tempData = data;
// 	const tempIsSorted = isSorted;
// 	const tempSortDirection = sortDirection;

// 	// mark the sortKey column as sorted, the rest as not
// 	Object.keys(tempIsSorted).forEach((key) => {
// 		if (key === sortKey) {
// 			tempIsSorted[key] = true;
// 		} else {
// 			tempIsSorted[key] = false;
// 		}
// 	});

// 	tempData.sort((a, b) => {
// 		// equal items sort equally
// 		if (a[sortKey] === b[sortKey]) {
// 			return 0;
// 		}
// 		// nulls sort after anything else
// 		else if (a[sortKey] === null) {
// 			return 1;
// 		} else if (b[sortKey] === null) {
// 			return -1;
// 		}
// 		// otherwise, if we're ascending, lowest sorts first
// 		else if (tempSortDirection[sortKey]) {
// 			return a[sortKey] < b[sortKey] ? -1 : 1;
// 		}
// 		// if descending, highest sorts first
// 		else {
// 			return a[sortKey] < b[sortKey] ? 1 : -1;
// 		}
// 	});

// 	// change the sortDirection
// 	const sortKeyDirection = tempSortDirection[sortKey];
// 	Object.keys(tempSortDirection).forEach((key) => {
// 		if (key === sortKey) {
// 			tempSortDirection[key] = !sortKeyDirection;
// 		} else {
// 			tempSortDirection[key] = true;
// 		}
// 	});

// 	setData(tempData);
// 	setIsSorted(tempIsSorted);
// 	setSortDirection(tempSortDirection);
// }

export function CollapsibleTable(props: TableProps) {
	const { rowData } = props;
	const [isSearch, setIsSearch] = useState(false);

	useEffect(() => {
		setIsSearch(true);
	}, [props.rowData]);

	return (
		<TableContainer component={Paper}>
			<Typography variant="h4" gutterBottom>
				{isSearch ? `${rowData.length} results found.` : ''}
			</Typography>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell />
						{tableList.map((header) => (
							<TableCell key={header.value}>{header.header}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rowData.map((row) => (
						<Row key={row.spell_name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export interface RowProps {
	row: Record<string, string>;
}

export function Row(props: RowProps): ReactElement {
	const { row } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Fragment>
			<TableRow>
				<TableCell>
					<IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				{tableList.map((value) => (
					<TableCell key={value.value}>{row[value.value]}</TableCell>
				))}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<Box margin={1}>{parse(row.description_formatted)}</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}
