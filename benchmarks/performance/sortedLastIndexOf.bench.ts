import { sortedLastIndexOf as sortedLastIndexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sortedLastIndexOf', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, 23, null];

  bench('es-toolkit/compat', () => {
    do_not_optimize(sortedLastIndexOfToolkitCompat(array, 40));
    do_not_optimize(sortedLastIndexOfToolkitCompat(array, 23));
    do_not_optimize(sortedLastIndexOfToolkitCompat(array, NaN));
    do_not_optimize(sortedLastIndexOfToolkitCompat(array, undefined));
    do_not_optimize(sortedLastIndexOfToolkitCompat(array, null));
  });
  bench('lodash/sortedIndex', () => {
    do_not_optimize(lodash.sortedLastIndexOf(array, 40));
    do_not_optimize(lodash.sortedLastIndexOf(array, 23));
    do_not_optimize(lodash.sortedLastIndexOf(array, NaN));
    do_not_optimize(lodash.sortedLastIndexOf(array, undefined));
    do_not_optimize(lodash.sortedLastIndexOf(array, null));
  });
});
