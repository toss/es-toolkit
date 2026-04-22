// eslint-disable-next-line @typescript-eslint/naming-convention
const globalThis_ =
  (typeof globalThis === 'object' && globalThis) ||
  (typeof window === 'object' && window) ||
  (typeof self === 'object' && self) ||
  (typeof global === 'object' && global) ||
  (function () {
    return this;
  })() ||
  Function('return this')();

export { globalThis_ as globalThis };
