import { pullAt as pullAtToolkit } from 'es-toolkit';
import { pullAt as pullAtToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('pullAt', () => {
  bench('es-toolkit/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    do_not_optimize(pullAtToolkit(array, indexes));
  });

  bench('es-toolkit/compat/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    do_not_optimize(pullAtToolkitCompat(array, indexes));
  });

  bench('lodash/pullAt', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const indexes = [3, 5, 1, 2];
    do_not_optimize(lodash.pullAt(array, indexes));
  });
});

group('pullAt/largeArray', () => {
  bench('es-toolkit/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    do_not_optimize(pullAtToolkit(largeArray, largeIndexes));
  });

  bench('es-toolkit/compat/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    do_not_optimize(pullAtToolkitCompat(largeArray, largeIndexes));
  });

  bench('lodash/pullAt', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const largeIndexes = Array.from({ length: 1000 }, (_, i) => i + 1000);
    do_not_optimize(lodash.pullAt(largeArray, largeIndexes));
  });
});
