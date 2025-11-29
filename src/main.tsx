// Importaciones de React
import React from 'react';
import { createRoot } from 'react-dom/client';
// Importación del componente principal de la aplicación
import App from './App';

// Obtener el elemento raíz del DOM
const container = document.getElementById('root');
// Crear la raíz de React
const root = createRoot(container!);
// Renderizar la aplicación en modo estricto
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);