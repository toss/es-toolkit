import { isBuffer as isBufferToolkit } from 'es-toolkit';
import { isBuffer as isBufferToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isBuffer', () => {
  bench('es-toolkit/isBuffer', () => {
    do_not_optimize(isBufferToolkit(Buffer.from('test')));
  });

  bench('es-toolkit/compat/isBuffer', () => {
    do_not_optimize(isBufferToolkitCompat(Buffer.from('test')));
  });

  bench('lodash/isBuffer', () => {
    do_not_optimize(lodash.isBuffer(Buffer.from('test')));
  });
});
