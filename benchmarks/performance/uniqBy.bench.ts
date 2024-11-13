import { bench, describe } from 'vitest';
import { uniqBy as uniqByToolkit_ } from 'es-toolkit';
import { uniqBy as uniqByToolkitCompat_ } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import { uniqBy as uniqByLodash_ } from 'lodash';

const uniqByToolkit = uniqByToolkit_;
const uniqByToolkitCompat = uniqByToolkitCompat_;
const uniqByLodash = uniqByLodash_;

describe('uniqBy, small arrays', () => {
  bench('es-toolkit/uniqBy', () => {
    uniqByToolkit([2.1, 1.2, 2.3], Math.floor);
  });

  bench('es-toolkit/compat/uniqBy', () => {
    uniqByToolkitCompat([2.1, 1.2, 2.3], Math.floor);
  });

  bench('lodash/uniqBy', () => {
    uniqByLodash([2.1, 1.2, 2.3], Math.floor);
  });
});

describe('uniqBy, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniqBy', () => {
    uniqByToolkit(largeArray, Math.floor);
  });

  bench('es-toolkit/compat/uniqBy', () => {
    uniqByToolkitCompat(largeArray, Math.floor);
  });

  bench('lodash/uniqBy', () => {
    uniqByLodash(largeArray, Math.floor);
  });
});
