import { isArray as isArrayToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isArray', () => {
  bench('es-toolkit/isArray', () => {
    do_not_optimize(isArrayToolkit([1, 2, 3]));
    do_not_optimize(isArrayToolkit('abc'));
    do_not_optimize(isArrayToolkit(() => {}));
  });

  bench('lodash/isArray', () => {
    do_not_optimize(lodash.isArray([1, 2, 3]));
    do_not_optimize(lodash.isArray('abc'));
    do_not_optimize(lodash.isArray(() => {}));
  });
});
