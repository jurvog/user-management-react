export default function DataTableHeaderRow({ columns, sort, sortColumn, filteredStatus }) {	

	function getClass(column) {
		if(sort.column !== column) return '';
		return sort.direction === 'asc' ? 'asc' : 'desc';
	}

	function handleSortClick(e, column) {
		e.preventDefault();
		sortColumn(column, sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc');
	}

	return (
		<thead>
			<tr className="header-row">
				{ columns.map(col => (
                    <th key={col.key}>
                        { col.sortable && (!filteredStatus || col.key !== 'status') 
                            ? <a href="#" onClick={(e) => handleSortClick(e, col.key)} className={getClass(col.key)}>{col.label}</a> 
                            : col.label 
                        }
                    </th>
				))}
			</tr>
		</thead>
	);
}