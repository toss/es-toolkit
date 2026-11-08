import { difference as differenceToolkit } from 'es-toolkit';
import { difference as differenceCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('difference', () => {
  bench('es-toolkit/difference', () => {
    do_not_optimize(differenceToolkit([1, 2, 3], [2]));
  });

  bench('es-toolkit/compat/difference', () => {
    do_not_optimize(differenceCompatToolkit([1, 2, 3], [2]));
  });

  bench('lodash/difference', () => {
    do_not_optimize(lodash.difference([1, 2, 3], [2]));
  });
});

group('difference/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500);

  bench('es-toolkit/difference', () => {
    do_not_optimize(differenceToolkit(largeArray, largeArray2));
  });

  bench('es-toolkit/compat/difference', () => {
    do_not_optimize(differenceCompatToolkit(largeArray, largeArray2));
  });

  bench('lodash/difference', () => {
    do_not_optimize(lodash.difference(largeArray, largeArray2));
  });
});
