import { floor as floorToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('floor', () => {
  bench('es-toolkit/floor', () => {
    do_not_optimize(floorToolkit(4.006));
    do_not_optimize(floorToolkit(4.006, 0));
    do_not_optimize(floorToolkit(4.016, 2));
    do_not_optimize(floorToolkit(4.1, 2));
    do_not_optimize(floorToolkit(4.4, 2));
    do_not_optimize(floorToolkit(4160, -2));
    do_not_optimize(floorToolkit(4.006, NaN));
    do_not_optimize(floorToolkit(4.016, 2.6));
    do_not_optimize(floorToolkit(4.016, '+2'));
    do_not_optimize(floorToolkit(5e1, 2));
    do_not_optimize(floorToolkit('5e', 1));
    do_not_optimize(floorToolkit('5e1e1', 1));
  });

  bench('lodash/floor', () => {
    do_not_optimize(lodash.floor(4.006));
    do_not_optimize(lodash.floor(4.006, 0));
    do_not_optimize(lodash.floor(4.016, 2));
    do_not_optimize(lodash.floor(4.1, 2));
    do_not_optimize(lodash.floor(4.4, 2));
    do_not_optimize(lodash.floor(4160, -2));
    do_not_optimize(lodash.floor(4.006, NaN));
    do_not_optimize(lodash.floor(4.016, 2.6));
    do_not_optimize(lodash.floor(4.016, '+2'));
    do_not_optimize(lodash.floor(5e1, 2));
    do_not_optimize(lodash.floor('5e', 1));
    do_not_optimize(lodash.floor('5e1e1', 1));
  });
});
