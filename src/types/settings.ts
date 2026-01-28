export const SORTABLE_COLUMNS = ['name', 'role', 'status'] as const;
export type SortableColumn = typeof SORTABLE_COLUMNS[number];

export interface SortState {
    column: SortableColumn | null;
    direction: 'asc' | 'desc';
}

export interface Settings {
    version: number;
    searchString: string;
    filteredStatus: string;
    sort: SortState,
    currentPage: number,
    itemsPerPage: number
};
