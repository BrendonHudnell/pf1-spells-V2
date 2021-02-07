import React, { ReactElement, useState } from 'react';

import { TableContainer } from './tableContainer';
import { SearchParametersContainer } from './searchParametersContainer';

export function Main(): ReactElement {
	const [tableData, setTableData] = useState([] as Record<string, any>[]);

	function updateTable(newData: Record<string, any>[]) {
		setTableData(newData);
	}

	return (
		<div className="main">
			<SearchParametersContainer onUpdate={updateTable} />
			<TableContainer tableData={tableData} />
		</div>
	);
}
