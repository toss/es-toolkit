import { bench, describe } from 'vitest';
import { sortedIndexOf as sortedIndexOfByTookitCompat_ } from 'es-toolkit/compat';
import { sortedIndexOf as sortedIndexOfLodash_ } from 'lodash';

const sortedIndexOfToolkitCompat = sortedIndexOfByTookitCompat_;
const sortedIndexOfLodash = sortedIndexOfLodash_;

describe('sortedIndexOf', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, 23, null];

  bench('es-toolkit/compat', () => {
    sortedIndexOfToolkitCompat(array, 40);
    sortedIndexOfToolkitCompat(array, 23);
    sortedIndexOfToolkitCompat(array, NaN);
    sortedIndexOfToolkitCompat(array, undefined);
    sortedIndexOfToolkitCompat(array, null);
  });
  bench('lodash/sortedIndex', () => {
    sortedIndexOfLodash(array, 40);
    sortedIndexOfLodash(array, 23);
    sortedIndexOfLodash(array, NaN);
    sortedIndexOfLodash(array, undefined);
    sortedIndexOfLodash(array, null);
  });
});
