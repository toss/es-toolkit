import { eq as eqToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('eq', () => {
  bench('es-toolkit/compat/eq', () => {
    do_not_optimize(eqToolkitCompat(NaN, NaN));
    do_not_optimize(eqToolkitCompat(NaN, 0));
    do_not_optimize(eqToolkitCompat(0, NaN));
    do_not_optimize(eqToolkitCompat(0, -0));
    do_not_optimize(eqToolkitCompat('abc', 'abc'));
  });

  bench('lodash/eq', () => {
    do_not_optimize(lodash.eq(NaN, NaN));
    do_not_optimize(lodash.eq(NaN, 0));
    do_not_optimize(lodash.eq(0, NaN));
    do_not_optimize(lodash.eq(0, -0));
    do_not_optimize(lodash.eq('abc', 'abc'));
  });
});
