import { Preferences } from '@capacitor/preferences';
import { User } from '../types/user.types';

/**
 * Servicio de Almacenamiento
 * Maneja la persistencia de datos locales usando Capacitor Preferences
 */

const STORAGE_KEYS = {
    USER: 'linguago_user',
    TOKEN: 'linguago_token',
    IS_LOGGED_IN: 'linguago_is_logged_in',
};

export const StorageService = {
    /**
     * Guardar datos de usuario en almacenamiento local
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
     * Obtener datos de usuario del almacenamiento local
     */
    async getUser(): Promise<User | null> {
        const { value } = await Preferences.get({ key: STORAGE_KEYS.USER });
        return value ? JSON.parse(value) : null;
    },

    /**
     * Verificar si el usuario ha iniciado sesión
     */
    async isLoggedIn(): Promise<boolean> {
        const { value } = await Preferences.get({ key: STORAGE_KEYS.IS_LOGGED_IN });
        return value === 'true';
    },

    /**
     * Limpiar todos los datos de usuario (cerrar sesión)
     */
    async clearUser(): Promise<void> {
        await Preferences.remove({ key: STORAGE_KEYS.USER });
        await Preferences.remove({ key: STORAGE_KEYS.TOKEN });
        await Preferences.remove({ key: STORAGE_KEYS.IS_LOGGED_IN });
    },

    /**
     * Actualizar datos de usuario en almacenamiento
     */
    async updateUser(userData: Partial<User>): Promise<void> {
        const currentUser = await this.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...userData };
            await this.saveUser(updatedUser);
        }
    },
};
