import axios, { AxiosInstance } from 'axios';
import { Capacitor } from '@capacitor/core';
import { User, LoginCredentials, RegisterData, ApiResponse, ProgressUpdate } from '../types/user.types';

/**
 * Servicio de API
 * Maneja todas las peticiones HTTP al servidor backend
 */

// URL base para la API del backend
// Para desarrollo: localhost
// Para producción: reemplazar con la URL de tu servidor
// Para Android Emulator: 10.0.2.2
const API_BASE_URL = Capacitor.getPlatform() === 'android'
    ? 'http://10.0.2.2:4000'
    : 'http://localhost:4000';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // Tiempo de espera de 10 segundos
        });

        // Interceptor de peticiones
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

        // Interceptor de respuestas
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
     * Registro de Usuario
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
     * Inicio de Sesión de Usuario
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
     * Actualizar perfil de usuario
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
     * Actualizar progreso del usuario en idiomas
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
     * Eliminar cuenta de usuario
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
     * Restablecer contraseña
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

// Exportar instancia singleton
export default new ApiService();
