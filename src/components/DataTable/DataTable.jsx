import { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { filter, paginate } from '@/utils/data-functions';
import { columns } from './columns';

import DataTableToolbar from './DataTableToolbar';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableRow from './DataTableRow';
import DataTableFooter from './DataTableFooter';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/components/UserForm/UserForm';
 
export default function DataTable() {

	const [modifiedUserId, setModifiedUserId] = useState(null);

	const [modalInfo, setModalInfo] = useState({
		modalOpen: false,
		modalTitle: '',
		modalData: null
	});

	const { 
		userData, 
		updateUserData, 
		settings, 
		updateSettings 
	} = useLocalStorage();

	const { 
		searchString, 
		filteredStatus, 
		sort, 
		currentPage, 
		itemsPerPage 
	} = settings;
	
	function handleSearch(e) {
		e.preventDefault();
		setModifiedUserId(null);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		updateSettings({
			searchString: data.search,
			filteredStatus: data.status,
			currentPage: 1
		});
	}

	function sortColumn(column, direction) {
		setModifiedUserId(null);
		updateSettings({
			sort: {
				column: sort.column === column && sort.direction === 'desc' ? null : column,
				direction: direction
			}
		});
	}

	function handlePageClick(e, page) {
		e.preventDefault();
		setModifiedUserId(null);        
		updateSettings({
			currentPage: page
		});
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}	

	function openModal(title, data) {
		setModifiedUserId(null);
		setModalInfo({
            modalOpen: true,
            modalTitle: title,
            modalData: data
		});
	}

	function closeModal() {
		setModalInfo({
            modalOpen: false,
            modalTitle: '',
            modalData: null
        });
	}

	function handleUserSave(nextUser) {
        updateUserData(prev => {
            if(prev.some(user => user.id === nextUser.id))
                return prev.map(user => user.id === nextUser.id ? nextUser : user);

            return [...prev, nextUser];
        });
        setModifiedUserId(nextUser.id);   
    }    

	function handleUserDelete(id) {
        setModifiedUserId(null);
		updateUserData(userData.filter(user => user.id !== id));
	}

	const filteredUserData = filter(userData, searchString, filteredStatus, sort);	

	const { 
		items: pagedUserData, 
		pageAmount, 
		startIndex, 
		endIndex, 
		total 
	} = paginate(filteredUserData, currentPage, itemsPerPage);	

    useEffect(() => {
        if(currentPage > pageAmount) updateSettings({ currentPage: pageAmount });
    }, [currentPage, pageAmount, updateSettings]);

	const statuses = useMemo(() => {
		return [...new Set(userData.map(user => user.status))].sort();
	}, [userData]);

	const roles = useMemo(() => {
		return [...new Set(userData.map(user => user.role))].sort();
	}, [userData]);

	return (
		<>
			<div className="table-container">
				<div className="title-row"><h1>User Management</h1></div>
				<DataTableToolbar 
					handleSearch={handleSearch} 
					searchString={searchString} 
					filteredStatus={filteredStatus} 
					statuses={statuses}
					openModal={openModal}
				/>
                <div className="table-wrapper">
                    <table>
                        <DataTableHeaderRow 
                            columns={columns}
                            sort={sort} 
                            sortColumn={sortColumn}
                            filteredStatus={filteredStatus} 
                        />
                        <tbody>
                        { pagedUserData.map(user => <DataTableRow 
                            key={user.id} 
                            columns={columns}
                            user={user} 
                            openModal={openModal} 
                            deleteUser={handleUserDelete} 
                            modifiedUserId={modifiedUserId}
                        />) }
                        </tbody>				
                    </table>
                    {pagedUserData.length === 0 && <p>No users found.</p>}
                </div>				
				<DataTableFooter 
					handlePageClick={handlePageClick} 
					pageInfo={{ 
						amount: pageAmount, 
						current: currentPage, 
						start: startIndex + 1, 
						end: Math.min(endIndex, total), 
						total: total 
					}} 
				/>
			</div>

			<Modal modalInfo={modalInfo} onClose={closeModal}>
				<UserForm 
					key={modalInfo.modalData?.id ?? 'new'} 
					user={modalInfo.modalData} 
					onSave={handleUserSave} 
					onClose={closeModal} 
					roles={roles} 
					statuses={statuses} 
				/>
			</Modal>
		</>
	);
}