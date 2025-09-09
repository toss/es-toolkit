import { bench, describe } from 'vitest';
import { sortedLastIndexOf as sortedLastIndexOfByTookitCompat_ } from 'es-toolkit/compat';
import { sortedLastIndexOf as sortedLastIndexOfLodash_ } from 'lodash';

const sortedLastIndexOfToolkitCompat = sortedLastIndexOfByTookitCompat_;
const sortedLastIndexOfLodash = sortedLastIndexOfLodash_;

describe('sortedLastIndexOf', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, 23, null];

  bench('es-toolkit/compat', () => {
    sortedLastIndexOfToolkitCompat(array, 40);
    sortedLastIndexOfToolkitCompat(array, 23);
    sortedLastIndexOfToolkitCompat(array, NaN);
    sortedLastIndexOfToolkitCompat(array, undefined);
    sortedLastIndexOfToolkitCompat(array, null);
  });
  bench('lodash/sortedIndex', () => {
    sortedLastIndexOfLodash(array, 40);
    sortedLastIndexOfLodash(array, 23);
    sortedLastIndexOfLodash(array, NaN);
    sortedLastIndexOfLodash(array, undefined);
    sortedLastIndexOfLodash(array, null);
  });
});
