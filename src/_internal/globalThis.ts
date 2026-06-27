declare let global: typeof globalThis;

// eslint-disable-next-line @typescript-eslint/naming-convention
const globalThis_: typeof globalThis =
  (typeof globalThis === 'object' && globalThis) ||
  (typeof window === 'object' && window) ||
  (typeof self === 'object' && self) ||
  (typeof global === 'object' && global) ||
  ((function (this: unknown) {
    return this;
  })() as typeof globalThis);

export { globalThis_ as globalThis };
