import { sortedIndex as sortedIndexToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sortedIndex', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    do_not_optimize(sortedIndexToolkitCompat(array, 39));
    do_not_optimize(sortedIndexToolkitCompat(array, NaN));
    do_not_optimize(sortedIndexToolkitCompat(array, undefined));
    do_not_optimize(sortedIndexToolkitCompat(array, null));
  });
  bench('lodash/sortedIndex', () => {
    do_not_optimize(lodash.sortedIndex(array, 39));
    do_not_optimize(lodash.sortedIndex(array, NaN));
    do_not_optimize(lodash.sortedIndex(array, undefined));
    do_not_optimize(lodash.sortedIndex(array, null));
  });
});
