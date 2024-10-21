import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkCompatToolkit } from 'es-toolkit/compat';
import { chunk as chunkLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('chunk', () => {
  bench('lodash/chunk', () => {
    chunkLodash([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/chunk', () => {
    chunkToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/chunk', () => {
    chunkCompatToolkit([1, 2, 3, 4, 5, 6], 3);
  });
});

describe('chunk/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('lodash/chunk', () => {
    chunkLodash(largeArray, 100);
  });

  bench('es-toolkit/chunk', () => {
    chunkToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/chunk', () => {
    chunkCompatToolkit(largeArray, 100);
  });
});
