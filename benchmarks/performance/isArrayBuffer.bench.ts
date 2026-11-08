import { isArrayBuffer as isArrayBufferToolkit } from 'es-toolkit';
import { isArrayBuffer as isArrayBufferToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isArrayBuffer', () => {
  bench('es-toolkit/isArrayBuffer', () => {
    do_not_optimize(isArrayBufferToolkit(new ArrayBuffer(16)));
    do_not_optimize(isArrayBufferToolkit(null));
    do_not_optimize(isArrayBufferToolkit([]));
    do_not_optimize(isArrayBufferToolkit(new Object()));
    do_not_optimize(isArrayBufferToolkit(new Map()));
  });

  bench('es-toolkit/compat/isArrayBuffer', () => {
    do_not_optimize(isArrayBufferToolkitCompat(new ArrayBuffer(16)));
    do_not_optimize(isArrayBufferToolkitCompat(null));
    do_not_optimize(isArrayBufferToolkitCompat([]));
    do_not_optimize(isArrayBufferToolkitCompat(new Object()));
    do_not_optimize(isArrayBufferToolkitCompat(new Map()));
  });

  bench('lodash/isArrayBuffer', () => {
    do_not_optimize(lodash.isArrayBuffer(new ArrayBuffer(16)));
    do_not_optimize(lodash.isArrayBuffer(null));
    do_not_optimize(lodash.isArrayBuffer([]));
    do_not_optimize(lodash.isArrayBuffer(new Object()));
    do_not_optimize(lodash.isArrayBuffer(new Map()));
  });
});
