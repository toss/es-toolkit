import { bench, describe } from 'vitest';
import { isArrayBuffer as isArrayBufferToolkit_ } from 'es-toolkit';
import { isArrayBuffer as isArrayBufferToolkitCompat_ } from 'es-toolkit/compat';
import { isArrayBuffer as isArrayBufferLodash_ } from 'lodash';

const isArrayBufferToolkit = isArrayBufferToolkit_;
const isArrayBufferToolkitCompat = isArrayBufferToolkitCompat_;
const isArrayBufferLodash = isArrayBufferLodash_;

describe('isArrayBuffer', () => {
  bench('es-toolkit/isArrayBuffer', () => {
    isArrayBufferToolkit(new ArrayBuffer(16));
    isArrayBufferToolkit(null);
    isArrayBufferToolkit([]);
    isArrayBufferToolkit(new Object());
    isArrayBufferToolkit(new Map());
  });

  bench('es-toolkit/isArrayBufferCompat', () => {
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
