import { bench, describe } from 'vitest';
import { sortedIndex as sortedIndexToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { sortedIndex: sortedIndexLodash } = lodash;

describe('sortedIndex', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    sortedIndexToolkitCompat(array, 39);
    sortedIndexToolkitCompat(array, NaN);
    sortedIndexToolkitCompat(array, undefined);
    sortedIndexToolkitCompat(array, null);
  });
  bench('lodash/sortedIndex', () => {
    sortedIndexLodash(array, 39);
    sortedIndexLodash(array, NaN);
    sortedIndexLodash(array, undefined);
    sortedIndexLodash(array, null);
  });
});
