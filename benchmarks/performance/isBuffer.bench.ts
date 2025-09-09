import { bench, describe } from 'vitest';
import { isBuffer as isBufferToolkit_ } from 'es-toolkit';
import { isBuffer as isBufferToolkitCompat_ } from 'es-toolkit/compat';
import { isBuffer as isBufferLodash_ } from 'lodash';

const isBufferToolkit = isBufferToolkit_;
const isBufferToolkitCompat = isBufferToolkitCompat_;
const isBufferLodash = isBufferLodash_;

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
