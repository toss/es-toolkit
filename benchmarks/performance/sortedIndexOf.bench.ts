import { sortedIndexOf as sortedIndexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sortedIndexOf', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, 23, null];

  bench('es-toolkit/compat', () => {
    do_not_optimize(sortedIndexOfToolkitCompat(array, 40));
    do_not_optimize(sortedIndexOfToolkitCompat(array, 23));
    do_not_optimize(sortedIndexOfToolkitCompat(array, NaN));
    do_not_optimize(sortedIndexOfToolkitCompat(array, undefined));
    do_not_optimize(sortedIndexOfToolkitCompat(array, null));
  });
  bench('lodash/sortedIndex', () => {
    do_not_optimize(lodash.sortedIndexOf(array, 40));
    do_not_optimize(lodash.sortedIndexOf(array, 23));
    do_not_optimize(lodash.sortedIndexOf(array, NaN));
    do_not_optimize(lodash.sortedIndexOf(array, undefined));
    do_not_optimize(lodash.sortedIndexOf(array, null));
  });
});
