import { iteratee as iterateeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('iteratee', () => {
  bench('es-toolkit/compat/iteratee', () => {
    do_not_optimize(iterateeToolkit(1));
    do_not_optimize(iterateeToolkit([1, 2]));
    do_not_optimize(iterateeToolkit({ a: 1 }));
    do_not_optimize(iterateeToolkit(() => {}));
  });

  bench('lodash/compat/iteratee', () => {
    do_not_optimize(lodash.iteratee(1));
    do_not_optimize(lodash.iteratee([1, 2]));
    do_not_optimize(lodash.iteratee({ a: 1 }));
    do_not_optimize(lodash.iteratee(() => {}));
  });
});
