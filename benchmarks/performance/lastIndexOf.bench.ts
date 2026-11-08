import { lastIndexOf as indexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('lastIndexOf', () => {
  const largeArray = Array(1_000_000)
    .fill(0)
    .map((_, i) => i);
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN', ...largeArray];

  bench('es-toolkit/compat/lastIndexOf', () => {
    do_not_optimize(indexOfToolkitCompat(array, 1));
    do_not_optimize(indexOfToolkitCompat(array, NaN));
    do_not_optimize(indexOfToolkitCompat(array, '1'));
    do_not_optimize(indexOfToolkitCompat(array, 'NaN', -5));
    do_not_optimize(indexOfToolkitCompat(array, 'NaN', -100));
  });

  bench('lodash/lastIndexOf', () => {
    do_not_optimize(lodash.lastIndexOf(array, 1));
    do_not_optimize(lodash.lastIndexOf(array, NaN));
    do_not_optimize(lodash.lastIndexOf(array, '1'));
    do_not_optimize(lodash.lastIndexOf(array, 'NaN', -5));
    do_not_optimize(lodash.lastIndexOf(array, 'NaN', -100));
  });
});
