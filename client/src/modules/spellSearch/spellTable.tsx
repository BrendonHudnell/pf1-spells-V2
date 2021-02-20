import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Typography,
} from '@material-ui/core';
import { TableData } from './types';
import { SpellTablePaginationActions } from './spellTablePaginationActions';
import { SpellTableRow } from './spellTableRow';

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

export interface SpellTableProps {
	rowData: TableData[];
}

export function SpellTable(props: SpellTableProps): ReactElement {
	const { rowData } = props;

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof TableData>('spell_name');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	function handleRequestSort(property: keyof TableData): void {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	}

	function sortData(data: TableData[]): TableData[] {
		data.sort((a, b) => {
			// nulls sort after anything else
			if (a[orderBy] === null) {
				return 1;
			}
			if (b[orderBy] === null) {
				return -1;
			}
			// if we're ascending, lowest sorts first
			if (order === 'asc') {
				return a[orderBy] < b[orderBy] ? -1 : 1;
			}
			// otherwise, if descending, highest sorts first
			if (order === 'desc') {
				return a[orderBy] < b[orderBy] ? 1 : -1;
			}
			return 0;
		});
		return data;
	}

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);

	function handleChangePage(
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	): void {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	return (
		<TableContainer>
			<Typography variant="h4" gutterBottom>
				{`${rowData.length} results found.`}
			</Typography>
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
					{(rowsPerPage > 0
						? sortData(rowData).slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
						  )
						: sortData(rowData)
					).map((row) => (
						<SpellTableRow key={row.spell_name} row={row} />
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[
								10,
								25,
								50,
								100,
								{ label: 'All', value: -1 },
							]}
							colSpan={6}
							count={rowData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={SpellTablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
