import { sortedLastIndexOf as sortedLastIndexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sortedLastIndexOf', () => {
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
    lodash.sortedLastIndexOf(array, 40);
    lodash.sortedLastIndexOf(array, 23);
    lodash.sortedLastIndexOf(array, NaN);
    lodash.sortedLastIndexOf(array, undefined);
    lodash.sortedLastIndexOf(array, null);
  });
});
