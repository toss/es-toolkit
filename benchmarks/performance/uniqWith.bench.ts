import { bench, describe } from 'vitest';
import { uniqWith as uniqWithToolkit } from 'es-toolkit';
import { randomInt } from 'crypto';
import { uniqWith as uniqWithLodash } from 'lodash';

describe('uniqWith, small arrays', () => {
  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/uniqWith', () => {
    uniqWithLodash([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

describe('uniqWith, large arrays', () => {
  const array = Array.from({ length: 10000 }).map(() => randomInt(0, 10000));
  const comparator = (x, y) => Math.floor(x) === Math.floor(y);

  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit(array, comparator);
  });

  bench('lodash/uniqWith', () => {
    uniqWithLodash(array, comparator);
  });
});
