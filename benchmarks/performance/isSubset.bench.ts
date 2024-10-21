import { isSubset as isSubsetToolkit } from 'es-toolkit';
import { difference as differenceLodash } from 'lodash';
import { bench, describe } from '../bench';

const isSubsetLodash = (array: any[], subset: any[]) => {
  return differenceLodash(array, subset).length === 0;
};

describe('isSubset', () => {
  bench('es-toolkit/isSubset', () => {
    isSubsetToolkit([1, 2, 3], [1, 2]);
  });

  bench('lodash/difference implementation', () => {
    isSubsetLodash([1, 2, 3], [1, 2]);
  });
});

describe('isSubset/largeArray', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, index) => index);
  const subset = Array.from({ length: 1000 }, (_, index) => index);

  bench('es-toolkit/isSubset', () => {
    isSubsetToolkit(largeArray, subset);
  });

  bench('lodash/difference implementation', () => {
    isSubsetLodash(largeArray, subset);
  });
});
