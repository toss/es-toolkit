import { bench, describe } from 'vitest';
import { reduce as reduceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { reduce: reduceLodash } = lodash;

const array = [1, 2, 3, 4, 5];

describe('reduce', () => {
  bench('es-toolkit/compat/reduce', () => {
    reduceToolkitCompat(array, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduce', () => {
    reduceLodash(array, (acc, x) => acc + x, 0);
  });
});

describe('reduce - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/reduce', () => {
    reduceToolkitCompat(largeArray, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduce', () => {
    reduceLodash(largeArray, (acc, x) => acc + x, 0);
  });
});
