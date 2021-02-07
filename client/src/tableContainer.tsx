import React, { ReactElement, useEffect, useState } from 'react';
import { Table } from './table';

export interface TableContainerProps {
	tableData: Record<string, any>[];
}

export function TableContainer(props: TableContainerProps): ReactElement {
	const [data, setData] = useState([] as Record<string, any>[]);
	const [isSearch, setIsSearch] = useState(false);
	const [isExpanded, setIsExpanded] = useState([] as boolean[]);
	const [prevExpand, setPrevExpand] = useState(-1);
	const [isSorted, setIsSorted] = useState({
		spell_name: false,
		spell_level: false,
		short_description: false,
		saving_throw: false,
		spell_resistance: false,
	} as Record<string, boolean>);
	const [sortDirection, setSortDirection] = useState({
		// true = ascending, false = descending
		spell_name: true,
		spell_level: true,
		short_description: true,
		saving_throw: true,
		spell_resistance: true,
	} as Record<string, boolean>);

	useEffect(() => {
		setData(props.tableData);
		setIsSearch(true);
		setIsExpanded(props.tableData.map(() => false));
	}, [props.tableData]);

	function handleExpand(index: number) {
		const tempIsExpanded = isExpanded;

		tempIsExpanded[index] = !tempIsExpanded[index];
		if (prevExpand !== -1 && prevExpand !== index) {
			tempIsExpanded[prevExpand] = false;
		}

		setPrevExpand(index);
		setIsExpanded(tempIsExpanded);
	}

	function handleSort(sortKey: string) {
		const tempData = data;
		const tempIsSorted = isSorted;
		const tempSortDirection = sortDirection;

		// mark the sortKey column as sorted, the rest as not
		Object.keys(tempIsSorted).forEach((key) => {
			if (key === sortKey) {
				tempIsSorted[key] = true;
			} else {
				tempIsSorted[key] = false;
			}
		});

		tempData.sort((a, b) => {
			// equal items sort equally
			if (a[sortKey] === b[sortKey]) {
				return 0;
			}
			// nulls sort after anything else
			else if (a[sortKey] === null) {
				return 1;
			} else if (b[sortKey] === null) {
				return -1;
			}
			// otherwise, if we're ascending, lowest sorts first
			else if (tempSortDirection[sortKey]) {
				return a[sortKey] < b[sortKey] ? -1 : 1;
			}
			// if descending, highest sorts first
			else {
				return a[sortKey] < b[sortKey] ? 1 : -1;
			}
		});

		// change the sortDirection
		const sortKeyDirection = tempSortDirection[sortKey];
		Object.keys(tempSortDirection).forEach((key) => {
			if (key === sortKey) {
				tempSortDirection[key] = !sortKeyDirection;
			} else {
				tempSortDirection[key] = true;
			}
		});

		setData(tempData);
		setIsSorted(tempIsSorted);
		setSortDirection(tempSortDirection);
	}

	return (
		<div className="results">
			<h4>{isSearch ? `${data.length} results found.` : ''}</h4>
			<div id="tableContainer">
				{data.length > 0 ? (
					<Table
						data={data}
						isSorted={isSorted}
						sortDirection={sortDirection}
						isExpanded={isExpanded}
						onSort={handleSort}
						onExpand={handleExpand}
					/>
				) : null}
			</div>
		</div>
	);
}
