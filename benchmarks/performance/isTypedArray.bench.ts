import { isTypedArray as isTypedArrayToolkit } from 'es-toolkit';
import { isTypedArray as isTypedArrayCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isTypedArrayToolkit', () => {
  bench('es-toolkit/isTypedArray', () => {
    do_not_optimize(isTypedArrayToolkit(new Uint8Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Uint8ClampedArray(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Uint16Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Uint32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new BigUint64Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Int8Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Int16Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Int32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new BigInt64Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Float32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayToolkit(new Float64Array(new ArrayBuffer(8))));
  });

  bench('es-toolkit/compat/isTypedArray', () => {
    do_not_optimize(isTypedArrayCompatToolkit(new Uint8Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Uint8ClampedArray(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Uint16Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Uint32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new BigUint64Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Int8Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Int16Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Int32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new BigInt64Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Float32Array(new ArrayBuffer(8))));
    do_not_optimize(isTypedArrayCompatToolkit(new Float64Array(new ArrayBuffer(8))));
  });

  bench('lodash/isTypedArray', () => {
    do_not_optimize(lodash.isTypedArray(new Uint8Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Uint8ClampedArray(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Uint16Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Uint32Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new BigUint64Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Int8Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Int16Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Int32Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new BigInt64Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Float32Array(new ArrayBuffer(8))));
    do_not_optimize(lodash.isTypedArray(new Float64Array(new ArrayBuffer(8))));
  });
});
