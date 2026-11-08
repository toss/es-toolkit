import { isNil as isNilToolkit } from 'es-toolkit';
import { isNil as isNilCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isNil', () => {
  bench('es-toolkit/isNil', () => {
    do_not_optimize(isNilToolkit(null));
    do_not_optimize(isNilToolkit(undefined));
    do_not_optimize(isNilToolkit(123));
    do_not_optimize(isNilToolkit([1, 2, 3]));
  });

  bench('es-toolkit/compat/isNil', () => {
    do_not_optimize(isNilCompatToolkit(null));
    do_not_optimize(isNilCompatToolkit(undefined));
    do_not_optimize(isNilCompatToolkit(123));
    do_not_optimize(isNilCompatToolkit([1, 2, 3]));
  });

  bench('lodash/isNil', () => {
    do_not_optimize(lodash.isNil(null));
    do_not_optimize(lodash.isNil(undefined));
    do_not_optimize(lodash.isNil(123));
    do_not_optimize(lodash.isNil([1, 2, 3]));
  });
});
