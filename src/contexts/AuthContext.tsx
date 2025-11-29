// Importaciones de React y hooks
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importación de tipos de usuario
import { User } from '../types/user.types';
// Importación del servicio de autenticación
import { AuthService } from '../services/auth.service';

// Interfaz que define el tipo del contexto de autenticación
interface AuthContextType {
    isAuthenticated: boolean;  // Indica si el usuario está autenticado
    user: User | null;         // Información del usuario actual
    loading: boolean;          // Indica si se está verificando la autenticación
    login: (user: User) => void;           // Función para iniciar sesión
    logout: () => void;                    // Función para cerrar sesión
    updateUser: (user: User) => void;      // Función para actualizar el usuario
    checkAuth: () => Promise<void>;        // Función para verificar autenticación
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Interfaz de props para el proveedor de autenticación
interface AuthProviderProps {
    children: ReactNode;  // Componentes hijos que tendrán acceso al contexto
}

// Componente proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Estado para indicar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // Estado para almacenar la información del usuario
    const [user, setUser] = useState<User | null>(null);
    // Estado para indicar si se está cargando la verificación de autenticación
    const [loading, setLoading] = useState<boolean>(true);

    // Verificar estado de autenticación al montar
    useEffect(() => {
        checkAuth();
    }, []);

    // Función para verificar el estado de autenticación
    const checkAuth = async () => {
        try {
            setLoading(true);
            // Verificar si el usuario está autenticado
            const authenticated = await AuthService.isAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                // Si está autenticado, obtener los datos del usuario
                const currentUser = await AuthService.getCurrentUser();
                setUser(currentUser);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Función para iniciar sesión (actualizar el estado con los datos del usuario)
    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            // Llamar al servicio para cerrar sesión en el backend
            await AuthService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Función para actualizar los datos del usuario en el contexto
    const updateUser = (userData: User) => {
        setUser(userData);
    };

    // Objeto con todos los valores y funciones del contexto
    const value: AuthContextType = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        updateUser,
        checkAuth,
    };

    // Proveer el contexto a los componentes hijos
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    // Verificar que el hook se use dentro del AuthProvider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
