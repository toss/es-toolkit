import { assignIn as assignInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('assignIn', () => {
  bench('es-toolkit/assignIn', () => {
    assignInToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assignIn', () => {
    lodash.assignIn({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
