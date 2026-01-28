export const USER_ROLES = ['Admin', 'Manager', 'User'] as const;
type UserRole = typeof USER_ROLES[number];

export const USER_STATUSES = ['Active', 'Disabled', 'Pending'] as const;
type UserStatus = typeof USER_STATUSES[number];

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}
