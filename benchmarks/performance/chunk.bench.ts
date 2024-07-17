import { bench, describe } from 'vitest';
import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkCompatToolkit } from 'es-toolkit/compat';
import { chunk as chunkLodash } from 'lodash';

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
