import { bench, describe } from 'vitest';
import { uniqWith as uniqWithToolkit_ } from 'es-toolkit';
import { uniqWith as uniqWithToolkitCompat_ } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import { uniqWith as uniqWithLodash_ } from 'lodash';

const uniqWithToolkit = uniqWithToolkit_;
const uniqWithToolkitCompat = uniqWithToolkitCompat_;
const uniqWithLodash = uniqWithLodash_;

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
  const comparator = (x, y) => Math.floor(x) === Math.floor(y);

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
