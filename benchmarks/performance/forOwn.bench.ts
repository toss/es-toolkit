import { forOwn as forOwnToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('forOwn', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const iteratee = (value: number, key: string, object: typeof obj) => [value, key, object];

  bench('es-toolkit/compat/forOwn', () => {
    do_not_optimize(forOwnToolkitCompat(obj, iteratee));
  });

  bench('lodash/forOwn', () => {
    do_not_optimize(lodash.forOwn(obj, iteratee));
  });
});
