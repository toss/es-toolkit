import { sampleSize as sampleSizeToolkit } from 'es-toolkit';
import { sampleSize as sampleSizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sampleSize', () => {
  bench('es-toolkit/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(sampleSizeToolkit(array, 3));
  });

  bench('es-toolkit/compat/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(sampleSizeToolkitCompat(array, 3));
  });

  bench('lodash/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(lodash.sampleSize(array, 3));
  });
});

group('sampleSize/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sampleSize', () => {
    do_not_optimize(sampleSizeToolkit(largeArray, 100));
  });

  bench('es-toolkit/compat/sampleSize', () => {
    do_not_optimize(sampleSizeToolkitCompat(largeArray, 100));
  });

  bench('lodash/sampleSize', () => {
    do_not_optimize(lodash.sampleSize(largeArray, 100));
  });
});
