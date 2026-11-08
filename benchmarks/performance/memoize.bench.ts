import { memoize as memoizeToolkit } from 'es-toolkit';
import { memoize as memoizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('memoize', () => {
  const object = { a: 1, b: 2, c: 3 };
  const other = { d: 4, e: 5, f: 6 };
  const values = (args: object) => {
    return Object.values(args);
  };
  bench('es-toolkit/memoize', () => {
    const memoized = memoizeToolkit(values);
    do_not_optimize(memoized(object));
    do_not_optimize(memoized(object)); // cached
    do_not_optimize(memoized(other));
    do_not_optimize(memoized(other)); // cached
  });

  bench('es-toolkit/compat/memoize', () => {
    const memoized = memoizeToolkitCompat(values);
    do_not_optimize(memoized(object));
    do_not_optimize(memoized(object)); // cached
    do_not_optimize(memoized(other));
    do_not_optimize(memoized(other)); // cached
  });

  bench('lodash/memoize', () => {
    const memoized = lodash.memoize(values);
    do_not_optimize(memoized(object));
    do_not_optimize(memoized(object)); // cached
    do_not_optimize(memoized(other));
    do_not_optimize(memoized(other)); // cached
  });
});
