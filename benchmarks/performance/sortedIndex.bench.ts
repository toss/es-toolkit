import { sortedIndex as sortedIndexToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sortedIndex', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    sortedIndexToolkitCompat(array, 39);
    sortedIndexToolkitCompat(array, NaN);
    sortedIndexToolkitCompat(array, undefined);
    sortedIndexToolkitCompat(array, null);
  });
  bench('lodash/sortedIndex', () => {
    lodash.sortedIndex(array, 39);
    lodash.sortedIndex(array, NaN);
    lodash.sortedIndex(array, undefined);
    lodash.sortedIndex(array, null);
  });
});
