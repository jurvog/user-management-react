import { ColumnCell, SORTABLE_COLUMNS, User, UserTableActions } from '@/types';
import { MouseEvent } from 'react';

function isSortable(key: string): boolean {
    return (SORTABLE_COLUMNS as readonly string[]).includes(key);
}

export const columns: ColumnCell<User, UserTableActions>[] = [
    {
        key: 'name',
        label: 'Name',
        sortable: isSortable('name'),
        render: (user, actions) => (
            <a href="#" onClick={(e: MouseEvent) => {
                e.preventDefault();
                actions.openModal(`Edit user (${user.name})`, user);
            }}>{user.name}</a>
        )
    },
    {
        key: 'email',
        label: 'Email',
        sortable: isSortable('email'),
    },
    {
        key: 'role',
        label: 'Role',
        sortable: isSortable('role'),
    },
    {
        key: 'status',
        label: 'Status',
        sortable: isSortable('status'),
        render: (user) => <span className={user.status.toLowerCase()}>{user.status}</span>
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        render: (user, actions) => (
            <>
                <button onClick={() => actions.openModal(`Edit user (${user.name})`, user)}>Edit</button>
                <button onClick={() => {
                    if (window.confirm(`Delete user ${user.name}?`)) {
                        actions.handleUserDelete(user.id);
                    }
                }}
                >Delete</button>
            </>
        )
    },
];
