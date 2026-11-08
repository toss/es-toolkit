import { range as rangeToolkit } from 'es-toolkit';
import { range as rangeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('range', () => {
  bench('es-toolkit/range', () => {
    do_not_optimize(rangeToolkit(0, 100, 1));
  });

  bench('es-toolkit/compat/range', () => {
    do_not_optimize(rangeCompatToolkit(0, 100, 1));
  });

  bench('lodash/range', () => {
    do_not_optimize(lodash.range(0, 100, 1));
  });
});
