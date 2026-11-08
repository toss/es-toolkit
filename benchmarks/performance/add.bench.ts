import { add as addToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('add function benchmark', () => {
  bench('es-toolkit/compat/add', () => {
    do_not_optimize(addToolkitCompat(2, 3));
    do_not_optimize(addToolkitCompat(-1, -5));
    do_not_optimize(addToolkitCompat(NaN, 3));
    do_not_optimize(addToolkitCompat(3, NaN));
    do_not_optimize(addToolkitCompat(NaN, NaN));
  });

  bench('lodash/add', () => {
    do_not_optimize(lodash.add(2, 3));
    do_not_optimize(lodash.add(-1, -5));
    do_not_optimize(lodash.add(NaN, 3));
    do_not_optimize(lodash.add(3, NaN));
    do_not_optimize(lodash.add(NaN, NaN));
  });
});
