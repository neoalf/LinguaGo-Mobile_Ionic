// Type definitions for LinguaGo Mobile App

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Not returned from API
    country: string;
    avatar: string;
    level: string;
    progressEnglish: number;
    progressFrench: number;
    progressRussian: number;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    country?: string;
    avatar?: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    user?: User;
}

export interface Course {
    id: string;
    name: string;
    language: string;
    description: string;
    image: string;
    progress: number;
}

export interface ProgressUpdate {
    progressEnglish?: number;
    progressFrench?: number;
    progressRussian?: number;
}
