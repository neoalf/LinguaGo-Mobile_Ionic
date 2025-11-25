import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonAvatar,
    IonText,
    IonProgressBar,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/react';
import { personCircleOutline, logOutOutline, bookOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/user.types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const history = useHistory();
    const { user: authUser, logout: authLogout } = useAuth();
    const [user, setUser] = useState<User | null>(authUser);

    useEffect(() => {
        if (authUser) {
            setUser(authUser);
        }
    }, [authUser]);

    const handleRefresh = async (event: CustomEvent) => {
        // User data is already managed by AuthContext
        event.detail.complete();
    };

    const handleLogout = async () => {
        await authLogout();
        history.replace('/login');
    };

    const courses = [
        {
            id: 'english',
            name: 'Inglés',
            description: 'El idioma global. Comunícate sin fronteras.',
            image: '/assets/img/Britain.png',
            progress: user?.progressEnglish || 0,
            route: '/course/english',
        },
        {
            id: 'french',
            name: 'Francés',
            description: 'El idioma del arte y la cultura.',
            image: '/assets/img/France.jpg',
            progress: user?.progressFrench || 0,
            route: '/course/french',
        },
        {
            id: 'russian',
            name: 'Ruso',
            description: 'Desafiante y poderoso. Expande tu mente.',
            image: '/assets/img/russian.jpeg',
            progress: user?.progressRussian || 0,
            route: '/course/russian',
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>LinguaGo</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="dashboard-content">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {/* User Profile Section */}
                <div className="user-section">
                    <IonAvatar className="user-avatar">
                        <img src={user?.avatar || '/assets/img/default-avatar-profile-icon.jpg'} alt="Avatar" />
                    </IonAvatar>
                    <h2>¡Hola, {user?.name}!</h2>
                    <p>{user?.level || 'Principiante'}</p>

                    <div className="user-actions">
                        <IonButton fill="outline" size="small" onClick={() => history.push('/profile')}>
                            <IonIcon slot="start" icon={personCircleOutline} />
                            Perfil
                        </IonButton>
                        <IonButton fill="outline" size="small" color="danger" onClick={handleLogout}>
                            <IonIcon slot="start" icon={logOutOutline} />
                            Salir
                        </IonButton>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="courses-section">
                    <h3>
                        <IonIcon icon={bookOutline} /> Tus Cursos
                    </h3>

                    {courses.map((course) => (
                        <IonCard key={course.id} className="course-card">
                            <div className="course-image">
                                <img src={course.image} alt={course.name} />
                            </div>
                            <IonCardHeader>
                                <IonCardTitle>{course.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{course.description}</p>

                                <div className="progress-section">
                                    <div className="progress-label">
                                        <IonText color="medium">Progreso</IonText>
                                        <IonText color="primary">
                                            <strong>{course.progress}%</strong>
                                        </IonText>
                                    </div>
                                    <IonProgressBar value={course.progress / 100} color="primary" />
                                </div>

                                <IonButton
                                    expand="block"
                                    onClick={() => history.push(course.route)}
                                    className="course-button"
                                >
                                    Continuar
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
