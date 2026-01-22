export default function DataTableRow({ user, columns, modifiedUserId, ...actions }) {

	return (
		<tr className={user.id === modifiedUserId ? 'modified' : ''}>
            { columns.map(col => (
                <td key={col.key}>
                    { col.render ? col.render(user, actions) : user?.[col.key] }
                </td>
            ))}
		</tr>
	);
}