import { rearg as reargToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('rearg', () => {
  function fn() {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/rearg', () => {
    do_not_optimize(reargToolkit(fn, [2, 0, 1]));
  });

  bench('lodash/rearg', () => {
    do_not_optimize(lodash.rearg(fn, [2, 0, 1]));
  });
});
