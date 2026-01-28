import { ColumnCell, User, UserTableActions } from '@/types';

export interface DataTableRowProps {
    user: User;
    columns: ColumnCell<User, UserTableActions>[];
    modifiedUserId: string | null;
    actions: UserTableActions;
}

export default function DataTableRow({ user, columns, modifiedUserId, actions }: DataTableRowProps) {

    return (
        <tr className={user.id === modifiedUserId ? 'modified' : ''}>
            {columns.map(col => (
                <td key={col.key}>
                    {col.render ? col.render(user, actions) : user[col.key as keyof User]}
                </td>
            ))}
        </tr>
    );
}
