import { zipWith as zipWithToolkit } from 'es-toolkit';
import { zipWith as zipWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('zipWith', () => {
  bench('es-toolkit/zipWith', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [5, 6];
    do_not_optimize(zipWithToolkit(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`));
  });

  bench('es-toolkit/compat/zipWith', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [5, 6];
    do_not_optimize(zipWithToolkitCompat(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`));
  });

  bench('lodash/zipWith', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [5, 6];
    do_not_optimize(lodash.zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`));
  });
});

group('zipWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zipWith', () => {
    do_not_optimize(zipWithToolkit(largeArray, largeArray, largeArray, (a, b, c) => a + b + c));
  });

  bench('es-toolkit/compat/zipWith', () => {
    do_not_optimize(zipWithToolkitCompat(largeArray, largeArray, largeArray, (a, b, c) => a + b + c));
  });

  bench('lodash/zipWith', () => {
    do_not_optimize(lodash.zipWith(largeArray, largeArray, largeArray, (a, b, c) => a + b + c));
  });
});
