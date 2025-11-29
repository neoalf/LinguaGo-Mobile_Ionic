// jest-dom añade matchers personalizados de jest para hacer aserciones en nodos del DOM.
// te permite hacer cosas como:
// expect(element).toHaveTextContent(/react/i)
// aprende más: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock de matchMedia para pruebas (necesario para componentes que usan media queries)
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,                 // Indica si la media query coincide
    addListener: function () { },   // Función para agregar listeners (deprecated)
    removeListener: function () { } // Función para remover listeners (deprecated)
  };
};
