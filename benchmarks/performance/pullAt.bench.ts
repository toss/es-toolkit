import { bench, describe } from 'vitest';
import { pullAt as pullAtToolkit_ } from 'es-toolkit';
import { pullAt as pullAtLodash_ } from 'lodash';

const pullAtToolkit = pullAtToolkit_;
const pullAtLodash = pullAtLodash_;

describe('pullAt', () => {
  const array = [0, 1, 2, 3, 4, 5];
  const indexes = [3, 5, 1, 2];

  bench('es-toolkit/pullAt', () => {
    pullAtToolkit(array, indexes);
  });

  bench('lodash/pullAt', () => {
    pullAtLodash(array, indexes);
  });
});

describe('pullAt/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);

  bench('es-toolkit/pullAt', () => {
    pullAtToolkit(largeArray, largeIndexes);
  });

  bench('lodash/pullAt', () => {
    pullAtLodash(largeArray, largeIndexes);
  });
});
