import React, { Fragment, ReactElement, useState } from 'react';
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
	TableSortLabel,
	Typography,
} from '@material-ui/core';
import { CollapseIcon, ExpandIcon } from '../icons';
import { TableData } from './types';

// TODO:
// - add pagination

export interface HeadCell {
	id: keyof TableData;
	label: string;
}

export const headCells: HeadCell[] = [
	{ id: 'spell_name', label: 'Spell Name' },
	{ id: 'spell_level', label: 'Spell Level' },
	{ id: 'short_description', label: 'Spell Description' },
	{ id: 'saving_throw', label: 'Saving Throw' },
	{ id: 'spell_resistance', label: 'Spell Resistance' },
];

export type Order = 'asc' | 'desc';

export interface TableProps {
	rowData: TableData[];
}

export function CollapsibleTable(props: TableProps) {
	const { rowData } = props;

	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof TableData>('spell_name');

	function handleRequestSort(property: keyof TableData) {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
		sortData();
	}

	function sortData() {
		rowData.sort((a, b) => {
			// nulls sort after anything else
			if (a[orderBy] === null) {
				return 1;
			} else if (b[orderBy] === null) {
				return -1;
			}
			// equal items sort equally
			else if (a[orderBy] === b[orderBy]) {
				return 0;
			}

			// if we're ascending, lowest sorts first
			else if (order === 'asc') {
				return a[orderBy] < b[orderBy] ? -1 : 1;
			}
			// otherwise, if descending, highest sorts first
			else {
				return a[orderBy] < b[orderBy] ? 1 : -1;
			}
		});
	}

	return (
		<TableContainer component={Paper}>
			<Typography
				variant="h4"
				gutterBottom
			>{`${rowData.length} results found.`}</Typography>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell />
						{headCells.map((headCell) => (
							<TableCell
								key={headCell.id}
								sortDirection={orderBy === headCell.id ? order : false}
							>
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={() => handleRequestSort(headCell.id)}
								>
									{headCell.label}
								</TableSortLabel>
							</TableCell>
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
	row: TableData;
}

export function Row(props: RowProps): ReactElement {
	const { row } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Fragment>
			<TableRow>
				<TableCell>
					<IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <CollapseIcon /> : <ExpandIcon />}
					</IconButton>
				</TableCell>
				{headCells.map((value) => (
					<TableCell key={value.id}>{row[value.id]}</TableCell>
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
