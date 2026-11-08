import { differenceBy as differenceByToolkit } from 'es-toolkit';
import { differenceBy as differenceByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('differenceBy', () => {
  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('es-toolkit/compat/differenceBy', () => {
    differenceByToolkitCompat([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('lodash/differenceBy', () => {
    lodash.differenceBy([1.2, 2.3, 3.4], [1.2], Math.floor);
  });
});

group('differenceBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit(largeArray, largeArray2, Math.floor);
  });

  bench('es-toolkit/compat/differenceBy', () => {
    differenceByToolkitCompat(largeArray, largeArray2, Math.floor);
  });

  bench('lodash/differenceBy', () => {
    lodash.differenceBy(largeArray, largeArray2, Math.floor);
  });
});
