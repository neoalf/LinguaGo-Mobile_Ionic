import { User, LoginCredentials, RegisterData } from '../types/user.types';
import ApiService from './api.service';
import { StorageService } from './storage.service';

/**
 * Servicio de Autenticación
 * Gestiona el estado y operaciones de autenticación del usuario
 */

export const AuthService = {
    /**
     * Iniciar sesión con credenciales
     */
    async login(credentials: LoginCredentials): Promise<User> {
        try {
            const user = await ApiService.login(credentials);
            await StorageService.saveUser(user);
            return user;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Registrar nuevo usuario
     */
    async register(data: RegisterData): Promise<void> {
        try {
            const response = await ApiService.register(data);
            if (response.success) {
                // Inicio de sesión automático después del registro
                await this.login({
                    email: data.email,
                    password: data.password,
                });
            }
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Cerrar sesión del usuario
     */
    async logout(): Promise<void> {
        await StorageService.clearUser();
    },

    /**
     * Obtener usuario actualmente autenticado
     */
    async getCurrentUser(): Promise<User | null> {
        return await StorageService.getUser();
    },

    /**
     * Verificar si el usuario está autenticado
     */
    async isAuthenticated(): Promise<boolean> {
        return await StorageService.isLoggedIn();
    },

    /**
     * Actualizar perfil del usuario
     */
    async updateProfile(userId: number, data: Partial<User>): Promise<User> {
        try {
            const response = await ApiService.updateProfile(userId, data);
            if (response.success && response.user) {
                await StorageService.updateUser(response.user);
                return response.user;
            }
            throw new Error('Error al actualizar perfil');
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Actualizar progreso de idiomas
     */
    async updateProgress(
        userId: number,
        progressEnglish?: number,
        progressFrench?: number,
        progressRussian?: number
    ): Promise<void> {
        try {
            await ApiService.updateProgress(userId, {
                progressEnglish,
                progressFrench,
                progressRussian,
            });

            // Actualizar almacenamiento local
            await StorageService.updateUser({
                progressEnglish,
                progressFrench,
                progressRussian,
            });
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Restablecer contraseña del usuario
     */
    async resetPassword(email: string, newPassword: string): Promise<void> {
        try {
            await ApiService.resetPassword(email, newPassword);
        } catch (error: any) {
            throw error;
        }
    },
};
