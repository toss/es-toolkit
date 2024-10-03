import { bench, describe } from 'vitest';
import { isSubset as isSubsetToolkit_ } from 'es-toolkit';
import { difference as differenceLodash_ } from 'lodash';

const isSubsetToolkit = isSubsetToolkit_;
const differenceLodash = differenceLodash_;

describe('isSubset', () => {
  bench('es-toolkit/isSubset', () => {
    isSubsetToolkit([1, 2, 3], [1, 2]);
  });

  bench('lodash/difference implementation', () => {
    differenceLodash([1, 2, 3], [1, 2]).length === 0;
  });
});

describe('isSubset/largeArray', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, index) => index);
  const subset = Array.from({ length: 1000 }, (_, index) => index);

  bench('es-toolkit/isSubset', () => {
    isSubsetToolkit(largeArray, subset);
  });

  bench('lodash/difference implementation', () => {
    differenceLodash(largeArray, subset).length === 0;
  });
});
