import { bench, describe } from 'vitest';
import { sortedIndexBy as sortedIndexByToolkitCompat_ } from 'es-toolkit/compat';
import { sortedIndexBy as sortedIndexByLodash_ } from 'lodash';

const sortedIndexByToolkitCompat = sortedIndexByToolkitCompat_;
const sortedIndexByLodash = sortedIndexByLodash_;

describe('sortedIndexBy', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    sortedIndexByToolkitCompat(array, 39, v => v);
    sortedIndexByToolkitCompat(array, NaN, v => v);
    sortedIndexByToolkitCompat(array, undefined, v => v);
    sortedIndexByToolkitCompat(array, null, v => v);
  });
  bench('lodash/sortedIndex', () => {
    sortedIndexByLodash(array, 39, v => v);
    sortedIndexByLodash(array, NaN, v => v);
    sortedIndexByLodash(array, undefined, v => v);
    sortedIndexByLodash(array, null, v => v);
  });
});
