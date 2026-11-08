import { divide as divideToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('divide function benchmark', () => {
  bench('es-toolkit/compat/divide', () => {
    do_not_optimize(divideToolkitCompat(3, 4));
    do_not_optimize(divideToolkitCompat(-3, -4));
    do_not_optimize(divideToolkitCompat(NaN, 3));
    do_not_optimize(divideToolkitCompat(3, NaN));
    do_not_optimize(divideToolkitCompat(NaN, NaN));
  });

  bench('lodash/divide', () => {
    do_not_optimize(lodash.divide(3, 4));
    do_not_optimize(lodash.divide(-3, -4));
    do_not_optimize(lodash.divide(NaN, 3));
    do_not_optimize(lodash.divide(3, NaN));
    do_not_optimize(lodash.divide(NaN, NaN));
  });
});
