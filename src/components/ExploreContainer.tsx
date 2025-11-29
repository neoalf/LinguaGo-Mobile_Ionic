// Importación de estilos CSS
import './ExploreContainer.css';

// Interfaz de props del componente (vacía en este caso)
interface ContainerProps { }

// Componente de contenedor de exploración (plantilla por defecto de Ionic)
const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
