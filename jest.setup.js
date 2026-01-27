import '@testing-library/jest-dom';
import fetch from 'cross-fetch';

global.fetch = fetch;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// const originalError = console.error;
// console.error = (...args) => {
//   if (args[0].includes('Warning: ReactDOM.render is no longer supported')) {
//     return;
//   }

//   originalError(...args);
// };
