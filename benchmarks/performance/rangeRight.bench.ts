import { rangeRight as rangeRightToolkit } from 'es-toolkit';
import { rangeRight as rangeRightCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('rangeRight', () => {
  bench('es-toolkit/rangeRight', () => {
    do_not_optimize(rangeRightToolkit(0, 100, 1));
  });

  bench('es-toolkit/compat/rangeRight', () => {
    do_not_optimize(rangeRightCompatToolkit(0, 100, 1));
  });

  bench('lodash/rangeRight', () => {
    do_not_optimize(lodash.rangeRight(0, 100, 1));
  });
});
