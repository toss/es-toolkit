import { differenceBy as differenceByToolkit } from 'es-toolkit';
import { differenceBy as differenceByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('differenceBy', () => {
  bench('es-toolkit/differenceBy', () => {
    do_not_optimize(differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor));
  });

  bench('es-toolkit/compat/differenceBy', () => {
    do_not_optimize(differenceByToolkitCompat([1.2, 2.3, 3.4], [1.2], Math.floor));
  });

  bench('lodash/differenceBy', () => {
    do_not_optimize(lodash.differenceBy([1.2, 2.3, 3.4], [1.2], Math.floor));
  });
});

group('differenceBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceBy', () => {
    do_not_optimize(differenceByToolkit(largeArray, largeArray2, Math.floor));
  });

  bench('es-toolkit/compat/differenceBy', () => {
    do_not_optimize(differenceByToolkitCompat(largeArray, largeArray2, Math.floor));
  });

  bench('lodash/differenceBy', () => {
    do_not_optimize(lodash.differenceBy(largeArray, largeArray2, Math.floor));
  });
});
