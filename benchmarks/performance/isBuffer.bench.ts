import { bench, describe } from 'vitest';
import { isBuffer as isBufferToolkit } from 'es-toolkit';
import { isBuffer as isBufferToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isBuffer: isBufferLodash } = lodash;

describe('isBuffer', () => {
  bench('es-toolkit/isBuffer', () => {
    isBufferToolkit(Buffer.from('test'));
  });

  bench('es-toolkit/compat/isBuffer', () => {
    isBufferToolkitCompat(Buffer.from('test'));
  });

  bench('lodash/isBuffer', () => {
    isBufferLodash(Buffer.from('test'));
  });
});
