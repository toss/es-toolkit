import { isBuffer as isBufferToolkit } from 'es-toolkit';
import { isBuffer as isBufferToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isBuffer', () => {
  bench('es-toolkit/isBuffer', () => {
    isBufferToolkit(Buffer.from('test'));
  });

  bench('es-toolkit/compat/isBuffer', () => {
    isBufferToolkitCompat(Buffer.from('test'));
  });

  bench('lodash/isBuffer', () => {
    lodash.isBuffer(Buffer.from('test'));
  });
});
