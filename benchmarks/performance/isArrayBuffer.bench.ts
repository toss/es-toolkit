import { bench, describe } from 'vitest';
import { isArrayBuffer as isArrayBufferToolkit } from 'es-toolkit';
import { isArrayBuffer as isArrayBufferLodash } from 'lodash';

describe('isArrayBuffer', () => {
  bench('es-toolkit/isArrayBuffer', () => {
    isArrayBufferToolkit(new ArrayBuffer(16));
    isArrayBufferToolkit(null);
    isArrayBufferToolkit([]);
    isArrayBufferToolkit(new Object());
    isArrayBufferToolkit(new Map());
  });

  bench('lodash/isArrayBuffer', () => {
    isArrayBufferLodash(new ArrayBuffer(16));
    isArrayBufferLodash(null);
    isArrayBufferLodash([]);
    isArrayBufferLodash(new Object());
    isArrayBufferLodash(new Map());
  });
});
