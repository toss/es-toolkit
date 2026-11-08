import { assign as assignToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('assign', () => {
  bench('es-toolkit/assign', () => {
    assignToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assign', () => {
    lodash.assign({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
