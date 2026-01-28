import { Settings, SortState, User } from '@/types';

import { mockData } from '@/data/mockData';
import { useCallback, useState } from 'react';

const DATA_KEY = 'user-editor-data';
const SETTINGS_KEY = 'user-editor-settings';
const SETTINGS_VERSION = 1;

const defaultSettings: Settings = {
    version: SETTINGS_VERSION,
    searchString: '',
    filteredStatus: '',
    sort: { column: null, direction: 'asc' },
    currentPage: 1,
    itemsPerPage: 50
};

function loadUserData(): User[] {
    try {
        const raw = localStorage.getItem(DATA_KEY);
        return raw ? JSON.parse(raw) : mockData as User[];
    } catch {
        return mockData as User[];
    }
}

function loadSettings(): Settings {
    try {
        if (!sessionStorage.getItem('appStarted')) {
            localStorage.removeItem(SETTINGS_KEY);
            sessionStorage.setItem('appStarted', 'true');
        }

        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return defaultSettings;

        const parsed = JSON.parse(raw);
        if (parsed.version !== SETTINGS_VERSION) return defaultSettings;

        return {
            ...defaultSettings,
            ...parsed,
            sort: parsed.sort ?? defaultSettings.sort
        };
    } catch {
        return defaultSettings;
    }
}

export function useLocalStorage() {

    const [userData, setUserData] = useState<User[]>(loadUserData);
    const [settings, setSettings] = useState<Settings>(loadSettings);

    type UserDataUpdater = User[] | ((prev: User[]) => User[]);

    const updateUserData = useCallback((updater: UserDataUpdater) => {
        setUserData((prev: User[]) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            localStorage.setItem(DATA_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    type SettingsUpdate = Omit<Partial<Settings>, 'sort'> & { sort?: SortState; }

    const updateSettings = useCallback((partial: SettingsUpdate) => {
        setSettings((prev: Settings) => {
            const next = {
                ...prev,
                ...partial,
                sort: partial.sort ?? prev.sort
            };
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    return {
        userData,
        updateUserData,
        settings,
        updateSettings
    };
}
