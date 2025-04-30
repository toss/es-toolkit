import { bench, describe } from 'vitest';
import { transform as transformToolkitCompat_ } from 'es-toolkit/compat';
import { transform as transformLodash_ } from 'lodash';

const transformToolkitCompat = transformToolkitCompat_;
const transformLodash = transformLodash_;

const array = [1, 2, 3, 4, 5];

describe('transform', () => {
  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(array, (acc, x) => acc + x, 0);
  });

  bench('lodash/transform', () => {
    transformLodash(array, (acc, x) => acc + x, 0);
  });
});

describe('transform - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(largeArray, (acc, x) => acc + x, 0);
  });

  bench('lodash/transform', () => {
    transformLodash(largeArray, (acc, x) => acc + x, 0);
  });
});
