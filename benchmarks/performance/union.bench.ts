import { union as unionToolkit } from 'es-toolkit';
import { union as unionToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('union', () => {
  bench('es-toolkit/union', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    do_not_optimize(unionToolkit(array1, array2));
  });

  bench('es-toolkit/compat/union', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    do_not_optimize(unionToolkitCompat(array1, array2));
  });

  bench('lodash/union', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    do_not_optimize(lodash.union(array1, array2));
  });
});

group('union/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => i + 5000);

  bench('es-toolkit/union', () => {
    do_not_optimize(unionToolkit(largeArray1, largeArray2));
  });

  bench('es-toolkit/compat/union', () => {
    do_not_optimize(unionToolkitCompat(largeArray1, largeArray2));
  });

  bench('lodash/union', () => {
    do_not_optimize(lodash.union(largeArray1, largeArray2));
  });
});
