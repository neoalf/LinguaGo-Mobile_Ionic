import { User, LoginCredentials, RegisterData } from '../types/user.types';
import ApiService from './api.service';
import { StorageService } from './storage.service';

/**
 * Authentication Service
 * Manages user authentication state and operations
 */

export const AuthService = {
    /**
     * Login user with credentials
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
     * Register new user
     */
    async register(data: RegisterData): Promise<void> {
        try {
            const response = await ApiService.register(data);
            if (response.success) {
                // Auto-login after registration
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
     * Logout user
     */
    async logout(): Promise<void> {
        await StorageService.clearUser();
    },

    /**
     * Get current logged in user
     */
    async getCurrentUser(): Promise<User | null> {
        return await StorageService.getUser();
    },

    /**
     * Check if user is authenticated
     */
    async isAuthenticated(): Promise<boolean> {
        return await StorageService.isLoggedIn();
    },

    /**
     * Update user profile
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
     * Update language progress
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

            // Update local storage
            await StorageService.updateUser({
                progressEnglish,
                progressFrench,
                progressRussian,
            });
        } catch (error: any) {
            throw error;
        }
    },
};
