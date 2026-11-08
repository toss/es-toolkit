import { assign as assignToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('assign', () => {
  bench('es-toolkit/assign', () => {
    do_not_optimize(assignToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }));
  });

  bench('lodash/assign', () => {
    do_not_optimize(lodash.assign({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }));
  });
});
