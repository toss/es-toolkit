import { bench, describe } from 'vitest';
import { sampleSize as sampleSizeToolkit_ } from 'es-toolkit';
import { sampleSize as sampleSizeLodash_ } from 'lodash';

const sampleSizeToolkit = sampleSizeToolkit_;
const sampleSizeLodash = sampleSizeLodash_;

describe('sampleSize', () => {
  bench('es-toolkit/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    sampleSizeToolkit(array, 3);
  });

  bench('lodash/sampleSize', () => {
    const array = [1, 2, 3, 4, 5];
    sampleSizeLodash(array, 3);
  });
});

describe('sampleSize/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sampleSize', () => {
    sampleSizeToolkit(largeArray, 100);
  });

  bench('lodash/sampleSize', () => {
    sampleSizeLodash(largeArray, 100);
  });
});
