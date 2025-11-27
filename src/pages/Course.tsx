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
    IonButton,
    IonProgressBar,
    IonText,
    IonIcon,
    IonToast,
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user.types';
import './Course.css';

interface CourseParams {
    language: string;
}

const Course: React.FC = () => {
    const history = useHistory();
    const { language } = useParams<CourseParams>();
    const [user, setUser] = useState<User | null>(null);
    const [progress, setProgress] = useState(0);
    const [toast, setToast] = useState<{ show: boolean; message: string }>({
        show: false,
        message: '',
    });

    const courseData: Record<string, any> = {
        english: {
            name: 'Inglés',
            description: 'El idioma global. Aprende inglés y comunícate sin fronteras.',
            image: '/assets/img/Britain.png',
            video: '/assets/video/MIXED CONDITIONALS. Codicionales Mixtos en Ingles.mp4',
            color: 'primary',
            lessons: [
                { id: 1, title: 'Saludos y Presentaciones', completed: false },
                { id: 2, title: 'Números y Fechas', completed: false },
                { id: 3, title: 'Familia y Amigos', completed: false },
                { id: 4, title: 'Comida y Bebidas', completed: false },
                { id: 5, title: 'Viajes y Transporte', completed: false },
            ],
        },
        french: {
            name: 'Francés',
            description: 'El idioma del arte y la cultura. ¡Descubre el encanto francés!',
            image: '/assets/img/France.jpg',
            video: '/assets/video/CLASE DE FRANCÉS 1.mp4',
            color: 'secondary',
            lessons: [
                { id: 1, title: 'Salutations et Présentations', completed: false },
                { id: 2, title: 'Nombres et Dates', completed: false },
                { id: 3, title: 'Famille et Amis', completed: false },
                { id: 4, title: 'Nourriture et Boissons', completed: false },
                { id: 5, title: 'Voyages et Transport', completed: false },
            ],
        },
        russian: {
            name: 'Ruso',
            description: 'Desafiante y poderoso. Expande tu mente aprendiendo ruso.',
            image: '/assets/img/russian.jpeg',
            video: '/assets/video/ABECEDARIO RUSO.mp4',
            color: 'tertiary',
            lessons: [
                { id: 1, title: 'Приветствия (Saludos)', completed: false },
                { id: 2, title: 'Числа и Даты (Números)', completed: false },
                { id: 3, title: 'Семья (Familia)', completed: false },
                { id: 4, title: 'Еда (Comida)', completed: false },
                { id: 5, title: 'Путешествия (Viajes)', completed: false },
            ],
        },
    };

    const currentCourse = courseData[language];

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) {
            history.replace('/login');
        } else {
            setUser(currentUser);
            // Establecer progreso basado en el idioma
            if (language === 'english') setProgress(currentUser.progressEnglish || 0);
            if (language === 'french') setProgress(currentUser.progressFrench || 0);
            if (language === 'russian') setProgress(currentUser.progressRussian || 0);
        }
    };

    const handleCompleteLesson = async () => {
        if (!user) return;

        const newProgress = Math.min(progress + 20, 100);
        setProgress(newProgress);

        try {
            const progressUpdate: any = {};
            if (language === 'english') progressUpdate.progressEnglish = newProgress;
            if (language === 'french') progressUpdate.progressFrench = newProgress;
            if (language === 'russian') progressUpdate.progressRussian = newProgress;

            await AuthService.updateProgress(
                user.id,
                progressUpdate.progressEnglish,
                progressUpdate.progressFrench,
                progressUpdate.progressRussian
            );

            setToast({
                show: true,
                message: '¡Lección completada! +20% de progreso',
            });
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    if (!currentCourse) {
        return (
            <IonPage>
                <IonContent>
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2>Curso no encontrado</h2>
                        <IonButton onClick={() => history.push('/dashboard')}>
                            Volver al Dashboard
                        </IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={currentCourse.color}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/dashboard" />
                    </IonButtons>
                    <IonTitle>{currentCourse.name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="course-content">
                {/* Encabezado del Curso */}
                <div className="course-header">
                    <img src={currentCourse.image} alt={currentCourse.name} />
                    <div className="course-info">
                        <h2>{currentCourse.name}</h2>
                        <p>{currentCourse.description}</p>
                    </div>
                </div>

                {/* Sección de Video */}
                <IonCard className="video-card">
                    <IonCardContent>
                        <h3>Video del Curso</h3>
                        <div className="video-container">
                            <video
                                controls
                                className="course-video"
                                poster={currentCourse.image}
                            >
                                <source src={currentCourse.video} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </IonCardContent>
                </IonCard>

                {/* Sección de Progreso */}
                <IonCard className="progress-card">
                    <IonCardContent>
                        <div className="progress-header">
                            <IonText>
                                <h3>Tu Progreso</h3>
                            </IonText>
                            <IonText color={currentCourse.color}>
                                <strong>{progress}%</strong>
                            </IonText>
                        </div>
                        <IonProgressBar value={progress / 100} color={currentCourse.color} />
                    </IonCardContent>
                </IonCard>

                {/* Sección de Lecciones */}
                <div className="lessons-section">
                    <h3>Lecciones</h3>

                    {currentCourse.lessons.map((lesson: any, index: number) => (
                        <IonCard key={lesson.id} className="lesson-card">
                            <IonCardContent>
                                <div className="lesson-header">
                                    <div className="lesson-number">{lesson.id}</div>
                                    <div className="lesson-info">
                                        <h4>{lesson.title}</h4>
                                        <p>Lección {lesson.id} de {currentCourse.lessons.length}</p>
                                    </div>
                                    {index * 20 < progress && (
                                        <IonIcon icon={checkmarkCircleOutline} color="success" className="completed-icon" />
                                    )}
                                </div>

                                {index * 20 === progress && (
                                    <IonButton
                                        expand="block"
                                        color={currentCourse.color}
                                        onClick={handleCompleteLesson}
                                        className="lesson-button"
                                    >
                                        Completar Lección
                                    </IonButton>
                                )}

                                {index * 20 > progress && (
                                    <IonButton
                                        expand="block"
                                        fill="outline"
                                        disabled
                                        className="lesson-button"
                                    >
                                        Bloqueado
                                    </IonButton>
                                )}
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>

                <IonToast
                    isOpen={toast.show}
                    message={toast.message}
                    duration={2000}
                    color="success"
                    onDidDismiss={() => setToast({ ...toast, show: false })}
                />
            </IonContent>
        </IonPage>
    );
};

export default Course;
