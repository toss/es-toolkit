import { bench, describe } from 'vitest';
import { nth as nthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { nth: nthLodash } = lodash;

describe('nth', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nth', () => {
    nthToolkitCompat(array, 1);
    nthToolkitCompat(array, -1);
  });

  bench('lodash/nth', () => {
    nthLodash(array, 1);
    nthLodash(array, -1);
  });
});

describe('nth/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nth', () => {
    nthToolkitCompat(largeArray, 1);
    nthToolkitCompat(largeArray, -1);
  });

  bench('lodash/nth', () => {
    nthLodash(largeArray, 1);
    nthLodash(largeArray, -1);
  });
});
