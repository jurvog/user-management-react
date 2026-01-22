export const columns = [
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        render: (user, { openModal }) => (
            <a href="#" onClick={(e) => {
                e.preventDefault();
                openModal(`Edit user (${user.name})`, user);
            }}>{user.name}</a>
        )
    },
    {
        key: 'email',
        label: 'Email',
        sortable: false,
    },
    {
        key: 'role',
        label: 'Role',
        sortable: true,
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (user) => <span className={user.status.toLowerCase()}>{user.status}</span>
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        render: (user, { openModal, deleteUser }) => (
            <>
                <button onClick={() => openModal(`Edit user (${user.name})`, user)}>Edit</button>
                <button onClick={() => {
                    if(window.confirm(`Delete user ${user.name}?`)) {
                        deleteUser(user.id);
                    }
                }}
                >Delete</button>
            </>
        )
    },
];