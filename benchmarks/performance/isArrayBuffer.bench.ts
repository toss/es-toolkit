import { isArrayBuffer as isArrayBufferToolkit } from 'es-toolkit';
import { isArrayBuffer as isArrayBufferToolkitCompat } from 'es-toolkit/compat';
import { isArrayBuffer as isArrayBufferLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('isArrayBuffer', () => {
  bench('es-toolkit/isArrayBuffer', () => {
    isArrayBufferToolkit(new ArrayBuffer(16));
    isArrayBufferToolkit(null);
    isArrayBufferToolkit([]);
    isArrayBufferToolkit(new Object());
    isArrayBufferToolkit(new Map());
  });

  bench('es-toolkit/compat/isArrayBuffer', () => {
    isArrayBufferToolkitCompat(new ArrayBuffer(16));
    isArrayBufferToolkitCompat(null);
    isArrayBufferToolkitCompat([]);
    isArrayBufferToolkitCompat(new Object());
    isArrayBufferToolkitCompat(new Map());
  });

  bench('lodash/isArrayBuffer', () => {
    isArrayBufferLodash(new ArrayBuffer(16));
    isArrayBufferLodash(null);
    isArrayBufferLodash([]);
    isArrayBufferLodash(new Object());
    isArrayBufferLodash(new Map());
  });
});
