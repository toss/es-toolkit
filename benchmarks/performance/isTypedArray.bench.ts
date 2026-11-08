import { isTypedArray as isTypedArrayToolkit } from 'es-toolkit';
import { isTypedArray as isTypedArrayCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isTypedArrayToolkit', () => {
  bench('es-toolkit/isTypedArray', () => {
    isTypedArrayToolkit(new Uint8Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Uint8ClampedArray(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Uint16Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Uint32Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new BigUint64Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Int8Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Int16Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Int32Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new BigInt64Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Float32Array(new ArrayBuffer(8)));
    isTypedArrayToolkit(new Float64Array(new ArrayBuffer(8)));
  });

  bench('es-toolkit/compat/isTypedArray', () => {
    isTypedArrayCompatToolkit(new Uint8Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Uint8ClampedArray(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Uint16Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Uint32Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new BigUint64Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Int8Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Int16Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Int32Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new BigInt64Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Float32Array(new ArrayBuffer(8)));
    isTypedArrayCompatToolkit(new Float64Array(new ArrayBuffer(8)));
  });

  bench('lodash/isTypedArray', () => {
    lodash.isTypedArray(new Uint8Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Uint8ClampedArray(new ArrayBuffer(8)));
    lodash.isTypedArray(new Uint16Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Uint32Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new BigUint64Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Int8Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Int16Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Int32Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new BigInt64Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Float32Array(new ArrayBuffer(8)));
    lodash.isTypedArray(new Float64Array(new ArrayBuffer(8)));
  });
});
