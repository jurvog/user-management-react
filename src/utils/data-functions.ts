/**
 * Common user data functions
 */
import { SortState, User } from '@/types';

export function filter(userData: User[], searchString: string, filteredStatus: string, sort: SortState) {

    return userData
        .filter((user) => (
            user.name.toLowerCase().includes(searchString.toLowerCase()) ||
            user.email.toLowerCase().includes(searchString.toLowerCase())
        ))
        .filter((user) => filteredStatus === '' ? true : user.status.toLowerCase() === filteredStatus)
        .sort((a, b) => {
            if (!sort.column) return 0;
            if (a[sort.column].toLowerCase() < b[sort.column].toLowerCase()) return sort.direction === 'asc' ? -1 : 1;
            if (a[sort.column].toLowerCase() > b[sort.column].toLowerCase()) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
}

export function paginate(data: User[], currentPage: number, itemsPerPage: number) {

    const total = data.length;
    const pageAmount = Math.ceil(total / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
        pageAmount,
        startIndex,
        endIndex,
        items: data.slice(startIndex, endIndex),
        total
    };
}
