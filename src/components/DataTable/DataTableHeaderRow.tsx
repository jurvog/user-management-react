import { ColumnBase, SortState, SortableColumn } from '@/types';
import { MouseEvent } from 'react';

interface DataTableHeaderRowProps {
    columns: ColumnBase[];
    sort: SortState;
    sortColumn: (column: SortableColumn, direction: 'asc' | 'desc') => void;
    filteredStatus: string | null;
}

export default function DataTableHeaderRow({ columns, sort, sortColumn, filteredStatus }: DataTableHeaderRowProps) {

    function getClass(column: string) {
        if (sort.column !== column) return '';
        return sort.direction === 'asc' ? 'asc' : 'desc';
    }

    function handleSortClick(e: MouseEvent, column: SortableColumn) {
        e.preventDefault();
        sortColumn(column, sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc');
    }

    return (
        <thead>
            <tr className="header-row">
                {columns.map(col => (
                    <th key={col.key}>
                        {col.sortable && (!filteredStatus || col.key !== 'status')
                            ? <a href="#" onClick={(e) => handleSortClick(e, col.key as SortableColumn)} className={getClass(col.key)}>{col.label}</a>
                            : col.label
                        }
                    </th>
                ))}
            </tr>
        </thead>
    );
}
