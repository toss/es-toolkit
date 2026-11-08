import { identity as identityToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('identity', () => {
  bench('es-toolkit/identity', () => {
    do_not_optimize(identityToolkit(5));
    do_not_optimize(identityToolkit('hello'));
    do_not_optimize(identityToolkit({ key: 'value' }));
    do_not_optimize(identityToolkit([1, 2, 3]));
    do_not_optimize(identityToolkit(true));
    do_not_optimize(identityToolkit(false));
  });

  bench('lodash/identity', () => {
    do_not_optimize(lodash.identity(5));
    do_not_optimize(lodash.identity('hello'));
    do_not_optimize(lodash.identity({ key: 'value' }));
    do_not_optimize(lodash.identity([1, 2, 3]));
    do_not_optimize(lodash.identity(true));
    do_not_optimize(lodash.identity(false));
  });
});
