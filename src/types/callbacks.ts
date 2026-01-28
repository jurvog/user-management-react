import type { User } from './user';

export type UserTableActions = {
    openModal: (title: string, data?: User | null) => void;
    handleUserDelete: (id: User['id']) => void;
};
