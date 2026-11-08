import { defaultTo as defaultToToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('defaultTo', () => {
  bench('es-toolkit/compat/defaultTo', () => {
    do_not_optimize(defaultToToolkitCompat(null, 123));
    do_not_optimize(defaultToToolkitCompat(undefined, '64'));
    do_not_optimize(defaultToToolkitCompat(NaN, 0));
    do_not_optimize(defaultToToolkitCompat(true, 0));
    do_not_optimize(defaultToToolkitCompat(123, 0));
  });

  bench('lodash/defaultTo', () => {
    do_not_optimize(lodash.defaultTo(null, 123));
    do_not_optimize(lodash.defaultTo(undefined, '64'));
    do_not_optimize(lodash.defaultTo(NaN, 0));
    do_not_optimize(lodash.defaultTo(true, 0));
    do_not_optimize(lodash.defaultTo(123, 0));
  });
});
