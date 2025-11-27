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
    IonSelect,
    IonSelectOption,
    IonInputPasswordToggle,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline, globeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register: React.FC = () => {
    const history = useHistory();
    const { login: setAuthUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'danger',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const validateForm = (): boolean => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setToast({
                show: true,
                message: 'Por favor completa todos los campos obligatorios',
                color: 'warning',
            });
            return false;
        }

        if (formData.name.length < 2) {
            setToast({
                show: true,
                message: 'El nombre debe tener al menos 2 caracteres',
                color: 'warning',
            });
            return false;
        }

        if (!formData.email.includes('@')) {
            setToast({
                show: true,
                message: 'Por favor ingresa un email válido',
                color: 'warning',
            });
            return false;
        }

        if (formData.password.length < 8) {
            setToast({
                show: true,
                message: 'La contraseña debe tener al menos 8 caracteres',
                color: 'warning',
            });
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setToast({
                show: true,
                message: 'Las contraseñas no coinciden',
                color: 'warning',
            });
            return false;
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await AuthService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                country: formData.country,
            });

            // Obtener el usuario recién creado y actualizar el contexto de autenticación
            const user = await AuthService.getCurrentUser();
            if (user) {
                setAuthUser(user);
            }

            setToast({
                show: true,
                message: '¡Cuenta creada exitosamente!',
                color: 'success',
            });

            // Navegar al panel después de un breve retraso
            setTimeout(() => {
                history.replace('/dashboard');
            }, 1000);
        } catch (error: any) {
            setToast({
                show: true,
                message: error.message || 'Error al registrar usuario',
                color: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent className="register-content">
                <div className="register-container">
                    {/* Logo */}
                    <div className="register-logo">
                        <img src="/assets/img/LinguaGo logo - Edited.png" alt="LinguaGo" />
                    </div>

                    {/* Título */}
                    <div className="register-header">
                        <h1>Crear Cuenta</h1>
                        <p>Únete a LinguaGo y comienza a aprender</p>
                    </div>

                    {/* Formulario de Registro */}
                    <form onSubmit={handleRegister} className="register-form">
                        {/* Entrada de Nombre */}
                        <div className="input-group">
                            <IonIcon icon={personOutline} className="input-icon" />
                            <IonInput
                                type="text"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onIonInput={(e) => handleInputChange('name', e.detail.value!)}
                                className="custom-input"
                            />
                        </div>

                        {/* Entrada de Correo Electrónico */}
                        <div className="input-group">
                            <IonIcon icon={mailOutline} className="input-icon" />
                            <IonInput
                                type="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                                className="custom-input"
                            />
                        </div>

                        {/* Selección de País */}
                        <div className="input-group">
                            <IonIcon icon={globeOutline} className="input-icon" />
                            <IonSelect
                                placeholder="País (opcional)"
                                value={formData.country}
                                onIonChange={(e) => handleInputChange('country', e.detail.value)}
                                className="custom-select"
                            >
                                <IonSelectOption value="Argentina">Argentina</IonSelectOption>
                                <IonSelectOption value="Bolivia">Bolivia</IonSelectOption>
                                <IonSelectOption value="Chile">Chile</IonSelectOption>
                                <IonSelectOption value="Colombia">Colombia</IonSelectOption>
                                <IonSelectOption value="Costa Rica">Costa Rica</IonSelectOption>
                                <IonSelectOption value="Ecuador">Ecuador</IonSelectOption>
                                <IonSelectOption value="El Salvador">El Salvador</IonSelectOption>
                                <IonSelectOption value="España">España</IonSelectOption>
                                <IonSelectOption value="Guatemala">Guatemala</IonSelectOption>
                                <IonSelectOption value="Honduras">Honduras</IonSelectOption>
                                <IonSelectOption value="México">México</IonSelectOption>
                                <IonSelectOption value="Nicaragua">Nicaragua</IonSelectOption>
                                <IonSelectOption value="Panamá">Panamá</IonSelectOption>
                                <IonSelectOption value="Paraguay">Paraguay</IonSelectOption>
                                <IonSelectOption value="Perú">Perú</IonSelectOption>
                                <IonSelectOption value="Uruguay">Uruguay</IonSelectOption>
                                <IonSelectOption value="Venezuela">Venezuela</IonSelectOption>
                                <IonSelectOption value="Otro">Otro</IonSelectOption>
                            </IonSelect>
                        </div>

                        {/* Entrada de Contraseña */}
                        <div className="input-group">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <IonInput
                                type="password"
                                placeholder="Contraseña (mín. 8 caracteres)"
                                value={formData.password}
                                onIonInput={(e) => handleInputChange('password', e.detail.value!)}
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
                                value={formData.confirmPassword}
                                onIonInput={(e) => handleInputChange('confirmPassword', e.detail.value!)}
                                className="custom-input"
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>
                        </div>

                        {/* Botón de Registro */}
                        <IonButton expand="block" type="submit" className="register-button">
                            Crear Cuenta
                        </IonButton>

                        {/* Enlace de Inicio de Sesión */}
                        <div className="login-link">
                            <IonText color="medium">
                                ¿Ya tienes cuenta?{' '}
                            </IonText>
                            <IonText color="primary" onClick={() => history.push('/login')}>
                                <strong>Inicia sesión</strong>
                            </IonText>
                        </div>
                    </form>
                </div>

                {/* Indicador de Carga */}
                <IonLoading isOpen={loading} message="Creando cuenta..." />

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

export default Register;
