import { bench, describe } from 'vitest';
import { isTypedArray as isTypedArrayToolkit } from 'es-toolkit';
import { isTypedArray as isTypedArrayLodash } from 'lodash';

describe('isTypedArrayToolkit', () => {
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

  bench('lodash/isTypedArray', () => {
    isTypedArrayLodash(new Uint8Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Uint8ClampedArray(new ArrayBuffer(8)));
    isTypedArrayLodash(new Uint16Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Uint32Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new BigUint64Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Int8Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Int16Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Int32Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new BigInt64Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Float32Array(new ArrayBuffer(8)));
    isTypedArrayLodash(new Float64Array(new ArrayBuffer(8)));
  });
});
