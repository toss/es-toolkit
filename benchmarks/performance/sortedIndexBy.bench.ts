import { sortedIndexBy as sortedIndexByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sortedIndexBy', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => ({ x: i * 2 }));
  const array = [...largeArray, NaN, undefined, null];

  bench('es-toolkit/compat', () => {
    // @ts-expect-error 'v' is possibly 'null' or 'undefined'.
    do_not_optimize(sortedIndexByToolkitCompat(array, { x: 39 }, v => v.x));
    do_not_optimize(sortedIndexByToolkitCompat(array, NaN, v => v));
    do_not_optimize(sortedIndexByToolkitCompat(array, undefined, v => v));
    do_not_optimize(sortedIndexByToolkitCompat(array, null, v => v));
  });
  bench('lodash/sortedIndex', () => {
    // @ts-expect-error 'v' is possibly 'null' or 'undefined'.
    do_not_optimize(lodash.sortedIndexBy(array, { x: 39 }, v => v.x));
    do_not_optimize(lodash.sortedIndexBy(array, NaN, v => v));
    do_not_optimize(lodash.sortedIndexBy(array, undefined, v => v));
    do_not_optimize(lodash.sortedIndexBy(array, null, v => v));
  });
});
