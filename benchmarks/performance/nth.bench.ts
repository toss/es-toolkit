import { nth as nthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('nth', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nth', () => {
    do_not_optimize(nthToolkitCompat(array, 1));
    do_not_optimize(nthToolkitCompat(array, -1));
  });

  bench('lodash/nth', () => {
    do_not_optimize(lodash.nth(array, 1));
    do_not_optimize(lodash.nth(array, -1));
  });
});

group('nth/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nth', () => {
    do_not_optimize(nthToolkitCompat(largeArray, 1));
    do_not_optimize(nthToolkitCompat(largeArray, -1));
  });

  bench('lodash/nth', () => {
    do_not_optimize(lodash.nth(largeArray, 1));
    do_not_optimize(lodash.nth(largeArray, -1));
  });
});
