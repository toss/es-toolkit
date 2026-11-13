import { isNaN as isNaNToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isNaN', () => {
  bench('es-toolkit/isNaN', () => {
    do_not_optimize(isNaNToolkit(NaN));
    do_not_optimize(isNaNToolkit(1));
    do_not_optimize(isNaNToolkit(null));
    do_not_optimize(isNaNToolkit(undefined));
    do_not_optimize(isNaNToolkit('NaN'));
  });

  bench('lodash/isNaN', () => {
    do_not_optimize(lodash.isNaN(NaN));
    do_not_optimize(lodash.isNaN(1));
    do_not_optimize(lodash.isNaN(null));
    do_not_optimize(lodash.isNaN(undefined));
    do_not_optimize(lodash.isNaN('NaN'));
  });
});
