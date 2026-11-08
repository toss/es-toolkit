import { sortedIndexOf as sortedIndexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sortedIndexOf', () => {
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
    lodash.sortedIndexOf(array, 40);
    lodash.sortedIndexOf(array, 23);
    lodash.sortedIndexOf(array, NaN);
    lodash.sortedIndexOf(array, undefined);
    lodash.sortedIndexOf(array, null);
  });
});
