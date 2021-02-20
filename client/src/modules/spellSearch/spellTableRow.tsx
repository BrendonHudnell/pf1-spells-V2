import React, { Fragment, ReactElement, useState } from 'react';
import {
	Box,
	Collapse,
	IconButton,
	TableCell,
	TableRow,
} from '@material-ui/core';
import parse from 'html-react-parser';
import { CollapseIcon, ExpandIcon } from '../../components/icons';
import { TableData } from './types';
import { headCells } from './spellTable';

export interface SpellTableRowProps {
	row: TableData;
}

export function SpellTableRow(props: SpellTableRowProps): ReactElement {
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
