import axios, { AxiosInstance } from 'axios';
import { User, LoginCredentials, RegisterData, ApiResponse, ProgressUpdate } from '../types/user.types';

/**
 * API Service
 * Handles all HTTP requests to the backend server
 */

// Base URL for the backend API
// For development: localhost
// For production: replace with your server URL
const API_BASE_URL = 'http://localhost:4000';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 seconds timeout
        });

        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => {
                console.log(`API Response: ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('API Response Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * User Registration
     */
    async register(data: RegisterData): Promise<ApiResponse> {
        try {
            const response = await this.api.post('/api/register', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al registrar usuario');
        }
    }

    /**
     * User Login
     */
    async login(credentials: LoginCredentials): Promise<User> {
        try {
            const response = await this.api.post('/api/login', credentials);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(userId: number, data: Partial<User>): Promise<ApiResponse<User>> {
        try {
            const response = await this.api.patch(`/api/users/${userId}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al actualizar perfil');
        }
    }

    /**
     * Update user progress for languages
     */
    async updateProgress(userId: number, progress: ProgressUpdate): Promise<ApiResponse> {
        try {
            const response = await this.api.patch(`/api/progress/${userId}`, progress);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al actualizar progreso');
        }
    }

    /**
     * Delete user account
     */
    async deleteAccount(userId: number): Promise<ApiResponse> {
        try {
            const response = await this.api.delete(`/api/users/${userId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al eliminar cuenta');
        }
    }

    /**
     * Reset password
     */
    async resetPassword(email: string, newPassword: string): Promise<ApiResponse> {
        try {
            const response = await this.api.post('/api/reset-password', {
                email,
                password: newPassword,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al restablecer contraseña');
        }
    }
}

// Export singleton instance
export default new ApiService();
