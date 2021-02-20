import React, { MouseEvent, ReactElement } from 'react';
import { createStyles, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import {
	FirstPageIcon,
	LastPageIcon,
	LeftArrowIcon,
	RightArrowIcon,
} from '../../components/icons';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
	})
);

export interface SpellTablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export function SpellTablePaginationActions(
	props: SpellTablePaginationActionsProps
): ReactElement {
	const classes = useStyles();
	const { count, page, rowsPerPage, onChangePage } = props;

	function handleFirstPageButtonClick(
		event: MouseEvent<HTMLButtonElement>
	): void {
		onChangePage(event, 0);
	}

	function handleBackButtonClick(event: MouseEvent<HTMLButtonElement>): void {
		onChangePage(event, page - 1);
	}

	function handleNextButtonClick(event: MouseEvent<HTMLButtonElement>): void {
		onChangePage(event, page + 1);
	}

	function handleLastPageButtonClick(
		event: MouseEvent<HTMLButtonElement>
	): void {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	}

	return (
		<div className={classes.root}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
				<FirstPageIcon />
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0}>
				<LeftArrowIcon />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				<RightArrowIcon />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				<LastPageIcon />
			</IconButton>
		</div>
	);
}
