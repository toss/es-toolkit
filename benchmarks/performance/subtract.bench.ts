import { subtract as subtractToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('subtract function benchmark', () => {
  bench('es-toolkit/compat/subtract', () => {
    do_not_optimize(subtractToolkitCompat(2, 3));
    do_not_optimize(subtractToolkitCompat(-1, -5));
    do_not_optimize(subtractToolkitCompat(NaN, 3));
    do_not_optimize(subtractToolkitCompat(3, NaN));
    do_not_optimize(subtractToolkitCompat(NaN, NaN));
  });

  bench('lodash/subtract', () => {
    do_not_optimize(lodash.subtract(2, 3));
    do_not_optimize(lodash.subtract(-1, -5));
    do_not_optimize(lodash.subtract(NaN, 3));
    do_not_optimize(lodash.subtract(3, NaN));
    do_not_optimize(lodash.subtract(NaN, NaN));
  });
});
