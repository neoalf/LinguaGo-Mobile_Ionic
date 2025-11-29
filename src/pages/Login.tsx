// Importaciones de React y hooks
import React, { useState } from 'react';
// Importaciones de componentes de Ionic
import {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonText,
    IonIcon,
    IonToast,
    IonLoading,
    IonInputPasswordToggle,
} from '@ionic/react';
// Importación de iconos
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
// Importación de React Router para navegación
import { useHistory } from 'react-router-dom';
// Importación del servicio de autenticación
import { AuthService } from '../services/auth.service';
// Importación del contexto de autenticación
import { useAuth } from '../contexts/AuthContext';
// Importación de estilos CSS
import './Login.css';

// Componente de página de inicio de sesión
const Login: React.FC = () => {
    // Hook para navegación
    const history = useHistory();
    // Obtener función de login del contexto de autenticación
    const { login: setAuthUser } = useAuth();
    // Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para indicador de carga
    const [loading, setLoading] = useState(false);
    // Estado para mensajes toast (notificaciones)
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'danger',
    });

    // Función para manejar el inicio de sesión
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación: verificar que todos los campos estén completos
        if (!email || !password) {
            setToast({
                show: true,
                message: 'Por favor completa todos los campos',
                color: 'warning',
            });
            return;
        }

        // Validación: verificar formato de email
        if (!email.includes('@')) {
            setToast({
                show: true,
                message: 'Por favor ingresa un email válido',
                color: 'warning',
            });
            return;
        }

        setLoading(true);

        try {
            // Intentar iniciar sesión con el servicio de autenticación
            const user = await AuthService.login({ email, password });

            // Actualizar contexto de autenticación - esto activa la redirección
            setAuthUser(user);

            setToast({
                show: true,
                message: '¡Bienvenido a LinguaGo!',
                color: 'success',
            });

            // Navegar al panel después de un breve retraso
            setTimeout(() => {
                history.replace('/dashboard');
            }, 1000);
        } catch (error: any) {
            setToast({
                show: true,
                message: error.message || 'Error al iniciar sesión',
                color: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent className="login-content">
                <div className="login-container">
                    {/* Logo */}
                    <div className="login-logo">
                        <img src="/assets/img/LinguaGo logo - Edited.png" alt="LinguaGo" />
                    </div>

                    {/* Título */}
                    <div className="login-header">
                        <h1>Bienvenido</h1>
                        <p>Aprende, practica y habla sin límites.</p>
                    </div>

                    {/* Formulario de Inicio de Sesión */}
                    <form onSubmit={handleLogin} className="login-form">
                        {/* Entrada de Correo Electrónico */}
                        <div className="input-group">
                            <IonIcon icon={mailOutline} className="input-icon" />
                            <IonInput
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value!)}
                                className="custom-input"
                            />
                        </div>

                        {/* Entrada de Contraseña */}
                        <div className="input-group">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <IonInput
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onIonInput={(e) => setPassword(e.detail.value!)}
                                className="custom-input"
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>
                        </div>

                        {/* Botón de Inicio de Sesión */}
                        <IonButton expand="block" type="submit" className="login-button">
                            Iniciar Sesión
                        </IonButton>

                        {/* Olvidé mi Contraseña */}
                        <div className="forgot-password">
                            <IonText color="primary" onClick={() => history.push('/forgot-password')}>
                                <small>¿Olvidaste tu contraseña?</small>
                            </IonText>
                        </div>

                        {/* Enlace de Registro */}
                        <div className="register-link">
                            <IonText color="medium">
                                ¿No tienes cuenta?{' '}
                            </IonText>
                            <IonText color="primary" onClick={() => history.push('/register')}>
                                <strong>Regístrate</strong>
                            </IonText>
                        </div>
                    </form>
                </div>

                {/* Indicador de Carga */}
                <IonLoading isOpen={loading} message="Iniciando sesión..." />

                {/* Notificaciones Toast */}
                <IonToast
                    isOpen={toast.show}
                    message={toast.message}
                    duration={3000}
                    color={toast.color}
                    onDidDismiss={() => setToast({ ...toast, show: false })}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;
