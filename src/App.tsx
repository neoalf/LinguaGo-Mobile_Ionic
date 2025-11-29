// Importaciones de React y React Router
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
// Importaciones de Ionic React
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// Importaciones de Capacitor para funcionalidades nativas
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Course from './pages/Course';

// Contexto
import { AuthProvider, useAuth } from './contexts/AuthContext';

/* CSS Core requerido para que los componentes de Ionic funcionen correctamente */
import '@ionic/react/css/core.css';

/* CSS Básico para apps construidas con Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Utils CSS opcionales que pueden ser comentados */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Modo Oscuro de Ionic */
import '@ionic/react/css/palettes/dark.system.css';

/* Variables de tema */
import './theme/variables.css';

// Configurar Ionic React con opciones por defecto
setupIonicReact();

// Componente de rutas de la aplicación
const AppRoutes: React.FC = () => {
  // Obtener estado de autenticación del contexto
  const { isAuthenticated, loading } = useAuth();

  // Mostrar carga mientras se verifica la autenticación
  if (loading) {
    return <IonApp></IonApp>;
  }

  // Renderizar la aplicación con rutas
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas Públicas */}
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>

          {/* Rutas Protegidas */}
          <Route exact path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {isAuthenticated ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/course/:language">
            {isAuthenticated ? <Course /> : <Redirect to="/login" />}
          </Route>

          {/* Ruta por Defecto */}
          <Route exact path="/">
            <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

// Componente principal de la aplicación
const App: React.FC = () => {
  // Efecto para inicializar la aplicación al montar
  useEffect(() => {
    initializeApp();
  }, []);

  // Función para inicializar configuraciones nativas de la app
  const initializeApp = async () => {
    // Ocultar pantalla de carga
    await SplashScreen.hide();

    // Configurar barra de estado
    try {
      await StatusBar.setStyle({ style: Style.Light });
    } catch (error) {
      console.log('Barra de estado no disponible');
    }
  };

  // Renderizar la aplicación envuelta en el proveedor de autenticación
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
