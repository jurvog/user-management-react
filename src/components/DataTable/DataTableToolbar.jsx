export default function DataTableToolbar({ handleSearch, searchString, filteredStatus, statuses, openModal }) {

	return (
		<div className="toolbar">
			<form onSubmit={handleSearch}>
				<div>
					<input defaultValue={searchString} name="search" type="text" placeholder="Search users..." aria-label="Search users" />
				</div>	
				<div>
					<select defaultValue={filteredStatus} name="status" aria-label="Select status">
						<option value="">All statuses</option>
						{ statuses.map(status => <option key={status} value={status.toLowerCase()}>{status}</option>) }
					</select>
				</div>
				<div>
					<button className="search">Search</button>
				</div>
			</form>
			<div>
				<button onClick={() => openModal('Add user')} className="add">Add user</button>
			</div>
		</div>
	);
}