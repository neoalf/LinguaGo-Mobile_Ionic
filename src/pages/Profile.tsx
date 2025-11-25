import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonToast,
    IonLoading,
    IonText,
    IonProgressBar,
} from '@ionic/react';
import { saveOutline, personOutline, mailOutline, globeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/user.types';
import './Profile.css';

const Profile: React.FC = () => {
    const history = useHistory();
    const { user: authUser, updateUser: updateAuthUser } = useAuth();
    const [user, setUser] = useState<User | null>(authUser);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: authUser?.name || '',
        country: authUser?.country || '',
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
        show: false,
        message: '',
        color: 'success',
    });

    useEffect(() => {
        if (authUser) {
            setUser(authUser);
            setFormData({
                name: authUser.name,
                country: authUser.country || '',
            });
        }
    }, [authUser]);

    const handleSave = async () => {
        if (!user) return;

        if (formData.name.trim().length < 2) {
            setToast({
                show: true,
                message: 'El nombre debe tener al menos 2 caracteres',
                color: 'warning',
            });
            return;
        }

        setLoading(true);

        try {
            const updatedUser = await AuthService.updateProfile(user.id, {
                name: formData.name,
                country: formData.country,
            });

            setUser(updatedUser);
            updateAuthUser(updatedUser); // Update auth context
            setEditMode(false);
            setToast({
                show: true,
                message: 'Perfil actualizado correctamente',
                color: 'success',
            });
        } catch (error: any) {
            setToast({
                show: true,
                message: error.message || 'Error al actualizar perfil',
                color: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name,
                country: user.country || '',
            });
        }
        setEditMode(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/dashboard" />
                    </IonButtons>
                    <IonTitle>Mi Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="profile-content">
                {/* Avatar Section */}
                <div className="profile-header">
                    <IonAvatar className="profile-avatar">
                        <img src={user?.avatar || '/assets/img/default-avatar-profile-icon.jpg'} alt="Avatar" />
                    </IonAvatar>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                </div>

                {/* Profile Info Card */}
                <IonCard className="profile-card">
                    <IonCardContent>
                        <h3>Información Personal</h3>

                        <div className="info-group">
                            <IonIcon icon={personOutline} className="info-icon" />
                            {editMode ? (
                                <IonInput
                                    value={formData.name}
                                    onIonInput={(e) => setFormData({ ...formData, name: e.detail.value! })}
                                    placeholder="Nombre"
                                    className="edit-input"
                                />
                            ) : (
                                <div className="info-text">
                                    <label>Nombre</label>
                                    <p>{user?.name}</p>
                                </div>
                            )}
                        </div>

                        <div className="info-group">
                            <IonIcon icon={mailOutline} className="info-icon" />
                            <div className="info-text">
                                <label>Email</label>
                                <p>{user?.email}</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <IonIcon icon={globeOutline} className="info-icon" />
                            {editMode ? (
                                <IonSelect
                                    value={formData.country}
                                    onIonChange={(e) => setFormData({ ...formData, country: e.detail.value })}
                                    placeholder="Selecciona tu país"
                                    className="edit-select"
                                >
                                    <IonSelectOption value="">Sin especificar</IonSelectOption>
                                    <IonSelectOption value="Argentina">Argentina</IonSelectOption>
                                    <IonSelectOption value="Chile">Chile</IonSelectOption>
                                    <IonSelectOption value="Colombia">Colombia</IonSelectOption>
                                    <IonSelectOption value="España">España</IonSelectOption>
                                    <IonSelectOption value="México">México</IonSelectOption>
                                    <IonSelectOption value="Perú">Perú</IonSelectOption>
                                    <IonSelectOption value="Otro">Otro</IonSelectOption>
                                </IonSelect>
                            ) : (
                                <div className="info-text">
                                    <label>País</label>
                                    <p>{user?.country || 'No especificado'}</p>
                                </div>
                            )}
                        </div>

                        {editMode ? (
                            <div className="edit-actions">
                                <IonButton expand="block" onClick={handleSave}>
                                    <IonIcon slot="start" icon={saveOutline} />
                                    Guardar Cambios
                                </IonButton>
                                <IonButton expand="block" fill="outline" onClick={handleCancel}>
                                    Cancelar
                                </IonButton>
                            </div>
                        ) : (
                            <IonButton expand="block" onClick={() => setEditMode(true)}>
                                Editar Perfil
                            </IonButton>
                        )}
                    </IonCardContent>
                </IonCard>

                {/* Progress Card */}
                <IonCard className="progress-card">
                    <IonCardContent>
                        <h3>Mi Progreso</h3>

                        <div className="progress-item">
                            <div className="progress-header">
                                <IonText>Inglés</IonText>
                                <IonText color="primary"><strong>{user?.progressEnglish || 0}%</strong></IonText>
                            </div>
                            <IonProgressBar value={(user?.progressEnglish || 0) / 100} color="primary" />
                        </div>

                        <div className="progress-item">
                            <div className="progress-header">
                                <IonText>Francés</IonText>
                                <IonText color="secondary"><strong>{user?.progressFrench || 0}%</strong></IonText>
                            </div>
                            <IonProgressBar value={(user?.progressFrench || 0) / 100} color="secondary" />
                        </div>

                        <div className="progress-item">
                            <div className="progress-header">
                                <IonText>Ruso</IonText>
                                <IonText color="tertiary"><strong>{user?.progressRussian || 0}%</strong></IonText>
                            </div>
                            <IonProgressBar value={(user?.progressRussian || 0) / 100} color="tertiary" />
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonLoading isOpen={loading} message="Guardando cambios..." />

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

export default Profile;
