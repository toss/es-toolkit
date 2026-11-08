import { forInRight as forInToolkitCompat, times } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('forInRight', () => {
  const bigObject = Object.fromEntries(times(1000, i => [i, i]));
  const iteratee = (value: number, key: string, object: typeof bigObject) => [value, key, object];

  bench('es-toolkit/compat/forInRight', () => {
    do_not_optimize(forInToolkitCompat(bigObject, iteratee));
  });

  bench('lodash/forInRight', () => {
    do_not_optimize(lodash.forInRight(bigObject, iteratee));
  });
});
