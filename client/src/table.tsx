import React from 'react';

const tableHeaders = [
	{ value: 'spell_name', display: 'Spell Name' },
	{ value: 'spell_level', display: 'Spell Level' },
	{ value: 'short_description', display: 'Spell Description' },
	{ value: 'saving_throw', display: 'Saving Throw' },
	{ value: 'spell_resistance', display: 'Spell Resistance' },
];

export interface TableProps {
	data: Record<string, string>[];
	isSorted: Record<string, boolean>;
	sortDirection: Record<string, boolean>;
	isExpanded: boolean[];
	onSort: (key: string) => void;
	onExpand: (index: number) => void;
}

export function Table(props: TableProps) {
	function createHeaders() {
		return tableHeaders.map((header) => {
			return (
				<th
					key={header.display}
					className={
						props.isSorted[header.value]
							? props.sortDirection[header.value]
								? 'bordered ascendingSort'
								: 'bordered descendingSort'
							: 'bordered'
					}
					onClick={() => props.onSort(header.value)}
				>
					{header.display}
				</th>
			);
		});
	}

	function createRows() {
		return props.data.map((row, index) => {
			const description = new DOMParser().parseFromString(
				row.description_formatted,
				'text/html'
			).body.innerHTML;
			console.log(description);
			return (
				<React.Fragment key={row.spell_name}>
					<tr className="bordered" onClick={() => props.onExpand(index)}>
						<td className="bordered">{row.spell_name}</td>
						<td className="bordered">{row.spell_level}</td>
						<td className="bordered">{row.short_description}</td>
						<td className="bordered">{row.saving_throw}</td>
						<td className="bordered">{row.spell_resistance}</td>
					</tr>
					<tr className={props.isExpanded[index] ? '' : 'hidden'}>
						<td className="expand" colSpan={tableHeaders.length}>
							{description}
						</td>
					</tr>
				</React.Fragment>
			);
		});
	}

	return (
		<table className="bordered">
			<tbody>
				<tr>{createHeaders()}</tr>
				{createRows()}
			</tbody>
		</table>
	);
}
