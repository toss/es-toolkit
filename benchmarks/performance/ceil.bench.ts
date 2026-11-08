import { ceil as ceilToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('ceil', () => {
  bench('es-toolkit/ceil', () => {
    do_not_optimize(ceilToolkit(4.006));
    do_not_optimize(ceilToolkit(4.006, 0));
    do_not_optimize(ceilToolkit(4.016, 2));
    do_not_optimize(ceilToolkit(4.1, 2));
    do_not_optimize(ceilToolkit(4.4, 2));
    do_not_optimize(ceilToolkit(4160, -2));
    do_not_optimize(ceilToolkit(4.006, NaN));
    do_not_optimize(ceilToolkit(4.016, 2.6));
    do_not_optimize(ceilToolkit(4.016, '+2'));
    do_not_optimize(ceilToolkit(5e1, 2));
    do_not_optimize(ceilToolkit('5e', 1));
    do_not_optimize(ceilToolkit('5e1e1', 1));
  });

  bench('lodash/ceil', () => {
    do_not_optimize(lodash.ceil(4.006));
    do_not_optimize(lodash.ceil(4.006, 0));
    do_not_optimize(lodash.ceil(4.016, 2));
    do_not_optimize(lodash.ceil(4.1, 2));
    do_not_optimize(lodash.ceil(4.4, 2));
    do_not_optimize(lodash.ceil(4160, -2));
    do_not_optimize(lodash.ceil(4.006, NaN));
    do_not_optimize(lodash.ceil(4.016, 2.6));
    do_not_optimize(lodash.ceil(4.016, '+2'));
    do_not_optimize(lodash.ceil(5e1, 2));
    do_not_optimize(lodash.ceil('5e', 1));
    do_not_optimize(lodash.ceil('5e1e1', 1));
  });
});
