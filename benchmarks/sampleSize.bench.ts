import { bench, describe } from 'vitest';
import { sampleSize as sampleSizeToolkit } from 'es-toolkit';
import { sampleSize as sampleSizeLodash } from 'lodash';

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
