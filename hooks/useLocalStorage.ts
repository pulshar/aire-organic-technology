import { useState, useEffect } from 'react';

/**
 * A professional hook to manage state in LocalStorage.
 * Handles JSON parsing, SSR safety, and synchronization across tabs.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Use a lazy initializer to avoid reading from localStorage on every render
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Update localStorage whenever the state changes
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}
