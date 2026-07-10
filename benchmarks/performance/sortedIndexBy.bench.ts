import { bench, describe } from 'vitest';
import { sortedIndexBy as sortedIndexByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { sortedIndexBy: sortedIndexByLodash } = lodash;

describe('sortedIndexBy', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    // @ts-expect-error 'v' is possibly 'null' or 'undefined'.
    sortedIndexByToolkitCompat(array, { x: 39 }, v => v.x);
    sortedIndexByToolkitCompat(array, NaN, v => v);
    sortedIndexByToolkitCompat(array, undefined, v => v);
    sortedIndexByToolkitCompat(array, null, v => v);
  });
  bench('lodash/sortedIndex', () => {
    // @ts-expect-error 'v' is possibly 'null' or 'undefined'.
    sortedIndexByLodash(array, { x: 39 }, v => v.x);
    sortedIndexByLodash(array, NaN, v => v);
    sortedIndexByLodash(array, undefined, v => v);
    sortedIndexByLodash(array, null, v => v);
  });
});
