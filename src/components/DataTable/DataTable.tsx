import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { HandlePageClick, SortColumn, User, UserTableActions } from '@/types';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { filter, paginate } from '@/utils/data-functions';

import { Modal, ModalProps } from '@/components/Modal/Modal';
import UserForm from '@/components/UserForm/UserForm';
import { columns } from './columns';
import DataTableFooter from './DataTableFooter';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableRow from './DataTableRow';
import DataTableToolbar from './DataTableToolbar';

export default function DataTable() {

    const [modifiedUserId, setModifiedUserId] = useState<string | null>(null);

    const [modalInfo, setModalInfo] = useState<ModalProps['modalInfo']>({
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

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setModifiedUserId(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        updateSettings({
            searchString: data.search as string,
            filteredStatus: data.status as string,
            currentPage: 1
        });
    }

    const sortColumn: SortColumn = (column, direction) => {
        setModifiedUserId(null);
        updateSettings({
            sort: {
                column: sort.column === column && sort.direction === 'desc' ? null : column,
                direction: direction
            }
        });
    }

    const handlePageClick: HandlePageClick = (e, page) => {
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

    const openModal: UserTableActions['openModal'] = useCallback((title, data = null) => {
        setModifiedUserId(null);
        setModalInfo({
            modalOpen: true,
            modalTitle: title,
            modalData: data
        });
    }, []);

    function closeModal() {
        setModalInfo({
            modalOpen: false,
            modalTitle: '',
            modalData: null
        });
    }

    function handleUserSave(nextUser: User) {
        updateUserData(prev => {
            if (prev.some(user => user.id === nextUser.id))
                return prev.map(user => user.id === nextUser.id ? nextUser : user);

            return [...prev, nextUser];
        });
        setModifiedUserId(nextUser.id);
    }

    const handleUserDelete: UserTableActions['handleUserDelete'] = useCallback((id) => {
        setModifiedUserId(null);
        updateUserData(prev => prev.filter((user) => user.id !== id));
    }, [updateUserData]);

    const actions = useMemo<UserTableActions>(() => ({
        openModal,
        handleUserDelete
    }), [openModal, handleUserDelete]);

    const filteredUserData = filter(userData, searchString, filteredStatus, sort);

    const {
        items: pagedUserData,
        pageAmount,
        startIndex,
        endIndex,
        total
    } = paginate(filteredUserData, currentPage, itemsPerPage);

    useEffect(() => {
        if (currentPage > pageAmount) updateSettings({ currentPage: pageAmount });
    }, [currentPage, pageAmount, updateSettings]);

    return (
        <>
            <div className="table-container">
                <div className="title-row"><h1>User Management</h1></div>
                <DataTableToolbar
                    handleSearch={handleSearch}
                    searchString={searchString}
                    filteredStatus={filteredStatus}
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
                            {pagedUserData.map(user =>
                                <DataTableRow
                                    key={user.id}
                                    columns={columns}
                                    user={user}
                                    modifiedUserId={modifiedUserId}
                                    actions={actions}
                                />
                            )}
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
                />
            </Modal>
        </>
    );
}
