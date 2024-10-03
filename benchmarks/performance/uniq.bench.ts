import { bench, describe } from 'vitest';
import { uniq as uniqToolkit_ } from 'es-toolkit';
import { randomInt } from 'crypto';
import { uniq as uniqLodash_ } from 'lodash';

const uniqToolkit = uniqToolkit_;
const uniqLodash = uniqLodash_;

describe('uniq', () => {
  bench('es-toolkit/uniq', () => {
    uniqToolkit([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('lodash/uniq', () => {
    uniqLodash([11, 2, 3, 44, 11, 2, 3]);
  });
});

describe('uniq/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniq', () => {
    uniqToolkit(largeArray);
  });

  bench('lodash/uniq', () => {
    uniqLodash(largeArray);
  });
});
