// Definiciones de tipos para la App Móvil LinguaGo

// Interfaz que representa un usuario en la aplicación
export interface User {
    id: number;                    // Identificador único del usuario
    name: string;                  // Nombre completo del usuario
    email: string;                 // Correo electrónico del usuario
    password?: string;             // Contraseña (no devuelto por la API)
    country: string;               // País del usuario
    avatar: string;                // URL del avatar del usuario
    level: string;                 // Nivel de aprendizaje del usuario
    progressEnglish: number;       // Progreso en inglés (0-100)
    progressFrench: number;        // Progreso en francés (0-100)
    progressRussian: number;       // Progreso en ruso (0-100)
    createdAt?: string;            // Fecha de creación de la cuenta
}

// Interfaz para las credenciales de inicio de sesión
export interface LoginCredentials {
    email: string;      // Correo electrónico del usuario
    password: string;   // Contraseña del usuario
}

// Interfaz para los datos de registro de un nuevo usuario
export interface RegisterData {
    name: string;       // Nombre completo del usuario
    email: string;      // Correo electrónico del usuario
    password: string;   // Contraseña del usuario
    country?: string;   // País del usuario (opcional)
    avatar?: string;    // URL del avatar del usuario (opcional)
}

// Interfaz genérica para las respuestas de la API
export interface ApiResponse<T = any> {
    success: boolean;   // Indica si la operación fue exitosa
    message?: string;   // Mensaje de respuesta (opcional)
    data?: T;           // Datos de respuesta genéricos (opcional)
    user?: User;        // Datos del usuario (opcional)
}

// Interfaz que representa un curso de idiomas
export interface Course {
    id: string;          // Identificador único del curso
    name: string;        // Nombre del curso
    language: string;    // Idioma del curso
    description: string; // Descripción del curso
    image: string;       // URL de la imagen del curso
    progress: number;    // Progreso del usuario en el curso (0-100)
}

// Interfaz para actualizar el progreso del usuario en los idiomas
export interface ProgressUpdate {
    progressEnglish?: number;   // Nuevo progreso en inglés (opcional)
    progressFrench?: number;    // Nuevo progreso en francés (opcional)
    progressRussian?: number;   // Nuevo progreso en ruso (opcional)
}
