import { bench, describe } from 'vitest';
import { uniqWith as uniqWithToolkit } from 'es-toolkit';
import { uniqWith as uniqWithLodash } from 'lodash';
import { randomInt } from 'crypto';

describe('uniqWith, small arrays', () => {
  bench('es-toolkit', () => {
    uniqWithToolkit([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash', () => {
    uniqWithLodash([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

describe('uniqWith, large arrays', () => {
  const array = Array.from({ length: 10000 }).map(() => randomInt(0, 10000));
  const comparator = (x, y) => Math.floor(x) === Math.floor(y);

  bench('es-toolkit', () => {
    uniqWithToolkit(array, comparator);
  });

  bench('lodash', () => {
    uniqWithLodash(array, comparator);
  });
});
