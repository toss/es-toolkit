import { bench, describe } from 'vitest';
import { uniqBy as uniqByToolkit_ } from 'es-toolkit';
import { randomInt } from 'crypto';
import { uniqBy as uniqByLodash_ } from 'lodash';

const uniqByToolkit = uniqByToolkit_;
const uniqByLodash = uniqByLodash_;

describe('uniqBy, small arrays', () => {
  bench('es-toolkit/uniqBy', () => {
    uniqByToolkit([2.1, 1.2, 2.3], Math.floor);
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

  bench('lodash/uniqBy', () => {
    uniqByLodash(largeArray, Math.floor);
  });
});
