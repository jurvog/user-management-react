import type { MouseEvent } from 'react';
import type { SortableColumn } from './settings';
import type { User } from './user';

export type UserTableActions = {
    openModal: (title: string, data?: User | null) => void;
    handleUserDelete: (id: User['id']) => void;
};

export type SortColumn = (column: SortableColumn, direction: 'asc' | 'desc') => void;

export type HandlePageClick = (e: MouseEvent<HTMLAnchorElement>, page: number) => void;
