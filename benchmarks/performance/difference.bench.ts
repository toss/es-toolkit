import { difference as differenceToolkit } from 'es-toolkit';
import { difference as differenceCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('difference', () => {
  bench('es-toolkit/difference', () => {
    differenceToolkit([1, 2, 3], [2]);
  });

  bench('es-toolkit/compat/difference', () => {
    differenceCompatToolkit([1, 2, 3], [2]);
  });

  bench('lodash/difference', () => {
    lodash.difference([1, 2, 3], [2]);
  });
});

group('difference/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500);

  bench('es-toolkit/difference', () => {
    differenceToolkit(largeArray, largeArray2);
  });

  bench('es-toolkit/compat/difference', () => {
    differenceCompatToolkit(largeArray, largeArray2);
  });

  bench('lodash/difference', () => {
    lodash.difference(largeArray, largeArray2);
  });
});
