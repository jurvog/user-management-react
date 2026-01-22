import { useState, useCallback } from 'react';
import { mockData } from '@/data/mockData';

const DATA_KEY = 'user-editor-data';
const SETTINGS_KEY = 'user-editor-settings';
const SETTINGS_VERSION = 1;

const defaultSettings = {
	version: SETTINGS_VERSION,
	searchString: '',
	filteredStatus: '',
	sort: { column: null, direction: 'asc' },
	currentPage: 1,
	itemsPerPage: 50
};

function loadUserData() {
	try {
		const raw = localStorage.getItem(DATA_KEY);
		return raw ? JSON.parse(raw) : mockData;
	} catch {
		return mockData;
	}
}

function loadSettings() {
	try {
        if(!sessionStorage.getItem('appStarted')) {
            localStorage.removeItem(SETTINGS_KEY);
            sessionStorage.setItem('appStarted', 'true');
        }

		const raw = localStorage.getItem(SETTINGS_KEY);
		if(!raw) return defaultSettings;

		const parsed = JSON.parse(raw);
		if(parsed.version !== SETTINGS_VERSION) return defaultSettings;

		return {
			...defaultSettings,
			...parsed,
			sort: {
				...defaultSettings.sort,
				...parsed.sort
			}
		};
	} catch {
		return defaultSettings;
	}
}

export function useLocalStorage() {

	const [userData, setUserData] = useState(loadUserData);
	const [settings, setSettings] = useState(loadSettings);

	const updateUserData = useCallback((updater) => {
		setUserData(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            localStorage.setItem(DATA_KEY, JSON.stringify(next));
            return next;
        });
	}, []);

	const updateSettings = useCallback((partial) => {
		setSettings(prev => {
			const next = {
				...prev,
				...partial,
				sort: {
					...prev.sort,
					...partial.sort
				}
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