import { isArrayBuffer as isArrayBufferToolkit } from 'es-toolkit';
import { isArrayBuffer as isArrayBufferToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isArrayBuffer', () => {
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
    lodash.isArrayBuffer(new ArrayBuffer(16));
    lodash.isArrayBuffer(null);
    lodash.isArrayBuffer([]);
    lodash.isArrayBuffer(new Object());
    lodash.isArrayBuffer(new Map());
  });
});
