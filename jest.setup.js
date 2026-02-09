import '@testing-library/jest-dom';
import fetch from 'cross-fetch';

global.fetch = fetch;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className, ...props }) => 
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} className={className} {...props} />,
}));

// const originalError = console.error;
// console.error = (...args) => {
//   if (args[0].includes('Warning: ReactDOM.render is no longer supported')) {
//     return;
//   }

//   originalError(...args);
// };
