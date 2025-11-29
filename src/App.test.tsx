// Importaciones de React y utilidades de testing
import React from 'react';
import { render } from '@testing-library/react';
// Importación del componente principal
import App from './App';

// Test básico para verificar que la aplicación se renderiza sin errores
test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
