import { toArray as toArrayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toArray', () => {
  bench('es-toolkit/compat/toArray', () => {
    do_not_optimize(toArrayToolkitCompat({ a: 1, b: 2 }));
    do_not_optimize(toArrayToolkitCompat('abc'));
    do_not_optimize(toArrayToolkitCompat(1));
    do_not_optimize(toArrayToolkitCompat(null));
    do_not_optimize(
      toArrayToolkitCompat(
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    );
  });

  bench('lodash/toArray', () => {
    do_not_optimize(lodash.toArray({ a: 1, b: 2 }));
    do_not_optimize(lodash.toArray('abc'));
    do_not_optimize(lodash.toArray(1));
    do_not_optimize(lodash.toArray(null));
    do_not_optimize(
      lodash.toArray(
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    );
  });
});
