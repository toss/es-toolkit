import { assignIn as assignInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('assignIn', () => {
  bench('es-toolkit/assignIn', () => {
    do_not_optimize(assignInToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }));
  });

  bench('lodash/assignIn', () => {
    do_not_optimize(lodash.assignIn({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }));
  });
});
