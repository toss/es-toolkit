import { bench, describe } from 'vitest';
import { uniqWith as uniqWithToolkit } from 'es-toolkit';
import { uniqWith as uniqWithToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';

const { uniqWith: uniqWithLodash } = lodash;

describe('uniqWith, small arrays', () => {
  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('es-toolkit/compat/uniqWith', () => {
    uniqWithToolkitCompat([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/uniqWith', () => {
    uniqWithLodash([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

describe('uniqWith, large arrays', () => {
  const array = Array.from({ length: 10000 }, () => randomInt(0, 10000));
  const comparator = (x: number, y: number) => Math.floor(x) === Math.floor(y);

  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit(array, comparator);
  });

  bench('es-toolkit/compat/uniqWith', () => {
    uniqWithToolkitCompat(array, comparator);
  });

  bench('lodash/uniqWith', () => {
    uniqWithLodash(array, comparator);
  });
});
