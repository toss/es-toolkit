import { take as takeToolkit } from 'es-toolkit';
import { take as takeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('take', () => {
  bench('es-toolkit/take', () => {
    takeToolkit([1, 2, 3, 4], 2);
  });

  bench('es-toolkit/compat/take', () => {
    takeToolkitCompat([1, 2, 3, 4], 2);
  });

  bench('lodash/take', () => {
    lodash.take([1, 2, 3, 4], 2);
  });
});

group('take/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/take', () => {
    takeToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/take', () => {
    takeToolkitCompat(largeArray, 100);
  });

  bench('lodash/take', () => {
    lodash.take(largeArray, 100);
  });
});
