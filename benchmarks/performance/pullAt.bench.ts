import { bench, describe } from 'vitest';
import { pullAt as pullAtToolkit_ } from 'es-toolkit';
import { pullAt as pullAtToolkitCompat_ } from 'es-toolkit/compat';
import { pullAt as pullAtLodash_ } from 'lodash';

const pullAtToolkit = pullAtToolkit_;
const pullAtToolkitCompat = pullAtToolkitCompat_;
const pullAtLodash = pullAtLodash_;

describe('pullAt', () => {
  bench('es-toolkit/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    pullAtToolkit(array, indexes);
  });

  bench('es-toolkit/compat/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    pullAtToolkitCompat(array, indexes);
  });

  bench('lodash/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    pullAtLodash(array, indexes);
  });
});

describe('pullAt/largeArray', () => {
  bench('es-toolkit/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    pullAtToolkit(largeArray, largeIndexes);
  });

  bench('es-toolkit/compat/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    pullAtToolkitCompat(largeArray, largeIndexes);
  });

  bench('lodash/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    pullAtLodash(largeArray, largeIndexes);
  });
});
