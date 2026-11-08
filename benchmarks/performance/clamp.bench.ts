import { clamp as clampToolkit } from 'es-toolkit';
import { clamp as clampCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('clamp', () => {
  bench('es-toolkit/clamp', () => {
    do_not_optimize(clampToolkit(10, 5, 15));
    do_not_optimize(clampToolkit(10, 5));
  });

  bench('es-toolkit/compat/clamp', () => {
    do_not_optimize(clampCompatToolkit(10, 5, 15));
    do_not_optimize(clampCompatToolkit(10, 5));
  });

  bench('lodash/clamp', () => {
    do_not_optimize(lodash.clamp(10, 5, 15));
    do_not_optimize(lodash.clamp(10, 5));
  });
});
