import { bench, describe } from 'vitest';
import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkLodash } from 'lodash';

describe('chunk', () => {
  bench('es-toolkit/chunk', () => {
    chunkToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/chunk', () => {
    chunkLodash([1, 2, 3, 4, 5, 6], 3);
  });
});
