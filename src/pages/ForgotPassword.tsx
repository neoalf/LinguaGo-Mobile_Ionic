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
import { mailOutline, lockClosedOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'danger',
    });

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación
        if (!email || !newPassword || !confirmPassword) {
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

        if (newPassword.length < 6) {
            setToast({
                show: true,
                message: 'La contraseña debe tener al menos 6 caracteres',
                color: 'warning',
            });
            return;
        }

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
