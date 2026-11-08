import { slice as sliceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('slice', () => {
  const array = Array(1000);
  bench('es-toolkit/compat/slice', () => {
    do_not_optimize(sliceToolkitCompat(array));
    do_not_optimize(sliceToolkitCompat(array, 1));
    do_not_optimize(sliceToolkitCompat(array, 1, 2));
    do_not_optimize(sliceToolkitCompat(array, 1, 1000));
  });

  bench('lodash/slice', () => {
    do_not_optimize(lodash.slice(array));
    do_not_optimize(lodash.slice(array, 1));
    do_not_optimize(lodash.slice(array, 1, 2));
    do_not_optimize(lodash.slice(array, 1, 1000));
  });
});
