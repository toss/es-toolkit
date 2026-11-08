import { multiply as multiplyToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('multiply function benchmark', () => {
  bench('es-toolkit/compat/multiply', () => {
    do_not_optimize(multiplyToolkitCompat(3, 4));
    do_not_optimize(multiplyToolkitCompat(-3, -4));
    do_not_optimize(multiplyToolkitCompat(NaN, 3));
    do_not_optimize(multiplyToolkitCompat(3, NaN));
    do_not_optimize(multiplyToolkitCompat(NaN, NaN));
  });

  bench('lodash/multiply', () => {
    do_not_optimize(lodash.multiply(3, 4));
    do_not_optimize(lodash.multiply(-3, -4));
    do_not_optimize(lodash.multiply(NaN, 3));
    do_not_optimize(lodash.multiply(3, NaN));
    do_not_optimize(lodash.multiply(NaN, NaN));
  });
});
