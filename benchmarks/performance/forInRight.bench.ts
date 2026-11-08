import { forInRight as forInToolkitCompat, times } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('forInRight', () => {
  const bigObject = Object.fromEntries(times(1000, i => [i, i]));
  const iteratee = (value: number, key: string, object: typeof bigObject) => [value, key, object];

  bench('es-toolkit/compat/forInRight', () => {
    forInToolkitCompat(bigObject, iteratee);
  });

  bench('lodash/forInRight', () => {
    lodash.forInRight(bigObject, iteratee);
  });
});
