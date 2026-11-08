import { forOwnRight as forOwnRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('forOwnRight', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const iteratee = (value: number, key: string, object: typeof obj) => [value, key, object];

  bench('es-toolkit/compat/forOwnRight', () => {
    do_not_optimize(forOwnRightToolkitCompat(obj, iteratee));
  });

  bench('lodash/forOwnRight', () => {
    do_not_optimize(lodash.forOwnRight(obj, iteratee));
  });
});
