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
import { mailOutline, lockClosedOutline, arrowBackOutline } from 'ionicons/icons';
// Importación de React Router para navegación
import { useHistory } from 'react-router-dom';
// Importación del servicio de autenticación
import { AuthService } from '../services/auth.service';
// Importación de estilos CSS
import './ForgotPassword.css';

// Componente para restablecer contraseña olvidada
const ForgotPassword: React.FC = () => {
    // Hook para navegación
    const history = useHistory();
    // Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Estado para indicador de carga
    const [loading, setLoading] = useState(false);
    // Estado para mensajes toast (notificaciones)
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'danger',
    });

    // Función para manejar el restablecimiento de contraseña
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación: verificar que todos los campos estén completos
        if (!email || !newPassword || !confirmPassword) {
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

        // Validación: verificar longitud mínima de contraseña
        if (newPassword.length < 6) {
            setToast({
                show: true,
                message: 'La contraseña debe tener al menos 6 caracteres',
                color: 'warning',
            });
            return;
        }

        // Validación: verificar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setToast({
                show: true,
                message: 'Las contraseñas no coinciden',
                color: 'warning',
            });
            return;
        }

        setLoading(true);

        try {
            // Llamar al servicio para restablecer la contraseña
            await AuthService.resetPassword(email, newPassword);

            setToast({
                show: true,
                message: '¡Contraseña restablecida exitosamente!',
                color: 'success',
            });

            // Redirigir al inicio de sesión después del éxito
            setTimeout(() => {
                history.replace('/login');
            }, 2000);
        } catch (error: any) {
            setToast({
                show: true,
                message: error.message || 'Error al restablecer contraseña',
                color: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent className="forgot-password-content">
                <div className="forgot-password-container">
                    {/* Botón de Volver */}
                    <div className="back-button" onClick={() => history.push('/login')}>
                        <IonIcon icon={arrowBackOutline} />
                        <span>Volver</span>
                    </div>

                    {/* Logo */}
                    <div className="forgot-password-logo">
                        <img src="/assets/img/LinguaGo logo - Edited.png" alt="LinguaGo" />
                    </div>

                    {/* Título */}
                    <div className="forgot-password-header">
                        <h1>Restablecer Contraseña</h1>
                        <p>Ingresa tu email y tu nueva contraseña</p>
                    </div>

                    {/* Formulario de Restablecimiento de Contraseña */}
                    <form onSubmit={handleResetPassword} className="forgot-password-form">
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

                        {/* Entrada de Nueva Contraseña */}
                        <div className="input-group">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <IonInput
                                type="password"
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onIonInput={(e) => setNewPassword(e.detail.value!)}
                                className="custom-input"
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>
                        </div>

                        {/* Entrada de Confirmación de Contraseña */}
                        <div className="input-group">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <IonInput
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                                className="custom-input"
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>
                        </div>

                        {/* Botón de Envío */}
                        <IonButton expand="block" type="submit" className="reset-button">
                            Restablecer Contraseña
                        </IonButton>

                        {/* Enlace de Inicio de Sesión */}
                        <div className="login-link">
                            <IonText color="medium">
                                ¿Recordaste tu contraseña?{' '}
                            </IonText>
                            <IonText color="primary" onClick={() => history.push('/login')}>
                                <strong>Inicia sesión</strong>
                            </IonText>
                        </div>
                    </form>
                </div>

                {/* Indicador de Carga */}
                <IonLoading isOpen={loading} message="Restableciendo contraseña..." />

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

export default ForgotPassword;
