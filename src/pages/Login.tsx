import React, { useState } from 'react';
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
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const history = useHistory();
    const { login: setAuthUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'danger',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setToast({
                show: true,
                message: 'Por favor completa todos los campos',
                color: 'warning',
            });
            return;
        }

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
            const user = await AuthService.login({ email, password });

            // Update auth context - this triggers the redirect
            setAuthUser(user);

            setToast({
                show: true,
                message: '¡Bienvenido a LinguaGo!',
                color: 'success',
            });

            // Navigate to dashboard after short delay
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

                    {/* Title */}
                    <div className="login-header">
                        <h1>Bienvenido</h1>
                        <p>Aprende, practica y habla sin límites.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="login-form">
                        {/* Email Input */}
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

                        {/* Password Input */}
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

                        {/* Login Button */}
                        <IonButton expand="block" type="submit" className="login-button">
                            Iniciar Sesión
                        </IonButton>

                        {/* Forgot Password */}
                        <div className="forgot-password">
                            <IonText color="primary" onClick={() => history.push('/forgot-password')}>
                                <small>¿Olvidaste tu contraseña?</small>
                            </IonText>
                        </div>

                        {/* Register Link */}
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

                {/* Loading Spinner */}
                <IonLoading isOpen={loading} message="Iniciando sesión..." />

                {/* Toast Notifications */}
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
