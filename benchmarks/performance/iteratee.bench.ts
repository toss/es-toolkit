import { iteratee as iterateeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('iteratee', () => {
  bench('es-toolkit/compat/iteratee', () => {
    iterateeToolkit(1);
    iterateeToolkit([1, 2]);
    iterateeToolkit({ a: 1 });
    iterateeToolkit(() => {});
  });

  bench('lodash/compat/iteratee', () => {
    lodash.iteratee(1);
    lodash.iteratee([1, 2]);
    lodash.iteratee({ a: 1 });
    lodash.iteratee(() => {});
  });
});
