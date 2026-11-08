import { forOwnRight as forOwnRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('forOwnRight', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const iteratee = (value: number, key: string, object: typeof obj) => [value, key, object];

  bench('es-toolkit/compat/forOwnRight', () => {
    forOwnRightToolkitCompat(obj, iteratee);
  });

  bench('lodash/forOwnRight', () => {
    lodash.forOwnRight(obj, iteratee);
  });
});
