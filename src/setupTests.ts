// jest-dom añade matchers personalizados de jest para hacer aserciones en nodos del DOM.
// te permite hacer cosas como:
// expect(element).toHaveTextContent(/react/i)
// aprende más: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock de matchmedia
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};
