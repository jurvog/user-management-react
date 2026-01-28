import { USER_STATUSES, UserTableActions } from "@/types";
import { FormEvent } from "react";

interface DataTableToolbarProps {
    handleSearch: (e: FormEvent<HTMLFormElement>) => void;
    searchString: string;
    filteredStatus: string;
    openModal: UserTableActions['openModal'];
}

export default function DataTableToolbar({ handleSearch, searchString, filteredStatus, openModal }: DataTableToolbarProps) {

    return (
        <div className="toolbar">
            <form onSubmit={handleSearch}>
                <div>
                    <input defaultValue={searchString} name="search" type="text" placeholder="Search users..." aria-label="Search users" />
                </div>
                <div>
                    <select defaultValue={filteredStatus} name="status" aria-label="Select status">
                        <option value="">All statuses</option>
                        {USER_STATUSES.map(status => <option key={status} value={status.toLowerCase()}>{status}</option>)}
                    </select>
                </div>
                <div>
                    <button>Search</button>
                </div>
            </form>
            <div>
                <button onClick={() => openModal('Add user')} className="cta">Add user</button>
            </div>
        </div>
    );
}
