import { bench, describe } from 'vitest';
import { xor as xorToolkit } from 'es-toolkit';
import { xor as xorLodash } from 'lodash';

describe('xor', () => {
  bench('es-toolkit', () => {
    xorToolkit([1, 2, 3, 4], [3, 4, 5, 6]);
  })

  bench('lodash', () => {
    xorLodash([1, 2, 3, 4], [3, 4, 5, 6]);
  })
});