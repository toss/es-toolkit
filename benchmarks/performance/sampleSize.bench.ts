import { sampleSize as sampleSizeToolkit } from 'es-toolkit';
import { sampleSize as sampleSizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sampleSize', () => {
  bench('es-toolkit/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    sampleSizeToolkit(array, 3);
  });

  bench('es-toolkit/compat/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    sampleSizeToolkitCompat(array, 3);
  });

  bench('lodash/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    lodash.sampleSize(array, 3);
  });
});

group('sampleSize/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sampleSize', () => {
    sampleSizeToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/sampleSize', () => {
    sampleSizeToolkitCompat(largeArray, 100);
  });

  bench('lodash/sampleSize', () => {
    lodash.sampleSize(largeArray, 100);
  });
});
