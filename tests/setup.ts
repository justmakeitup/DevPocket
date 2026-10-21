import '@testing-library/jest-dom';

// Polyfill window.crypto if needed in jsdom
if (typeof window !== 'undefined') {
  if (!window.crypto) {
    // @ts-expect-error polyfill
    window.crypto = {};
  }
  if (!window.crypto.randomUUID) {
    window.crypto.randomUUID = () => '3e32e6c7-27e5-4ef1-831e-f34f6fd79ff5';
  }
}
