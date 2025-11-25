import { Preferences } from '@capacitor/preferences';
import { User } from '../types/user.types';

/**
 * Storage Service
 * Handles local data persistence using Capacitor Preferences
 */

const STORAGE_KEYS = {
    USER: 'linguago_user',
    TOKEN: 'linguago_token',
    IS_LOGGED_IN: 'linguago_is_logged_in',
};

export const StorageService = {
    /**
     * Save user data to local storage
     */
    async saveUser(user: User): Promise<void> {
        await Preferences.set({
            key: STORAGE_KEYS.USER,
            value: JSON.stringify(user),
        });
        await Preferences.set({
            key: STORAGE_KEYS.IS_LOGGED_IN,
            value: 'true',
        });
    },

    /**
     * Get user data from local storage
     */
    async getUser(): Promise<User | null> {
        const { value } = await Preferences.get({ key: STORAGE_KEYS.USER });
        return value ? JSON.parse(value) : null;
    },

    /**
     * Check if user is logged in
     */
    async isLoggedIn(): Promise<boolean> {
        const { value } = await Preferences.get({ key: STORAGE_KEYS.IS_LOGGED_IN });
        return value === 'true';
    },

    /**
     * Clear all user data (logout)
     */
    async clearUser(): Promise<void> {
        await Preferences.remove({ key: STORAGE_KEYS.USER });
        await Preferences.remove({ key: STORAGE_KEYS.TOKEN });
        await Preferences.remove({ key: STORAGE_KEYS.IS_LOGGED_IN });
    },

    /**
     * Update user data in storage
     */
    async updateUser(userData: Partial<User>): Promise<void> {
        const currentUser = await this.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...userData };
            await this.saveUser(updatedUser);
        }
    },
};
