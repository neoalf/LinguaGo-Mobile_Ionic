// Importaciones de componentes de Ionic
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// Importación del componente ExploreContainer
import ExploreContainer from '../components/ExploreContainer';
// Importación de estilos CSS
import './Home.css';

// Componente de página de inicio (plantilla por defecto de Ionic)
const Home: React.FC = () => {
  return (
    <IonPage>
      {/* Encabezado principal */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Contenido principal con scroll */}
      <IonContent fullscreen>
        {/* Encabezado colapsable para scroll */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
