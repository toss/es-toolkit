import { bench, describe } from 'vitest';
import { xor as xorToolkit_ } from 'es-toolkit';
import { xor as xorLodash_ } from 'lodash';

const xorToolkit = xorToolkit_;
const xorLodash = xorLodash_;

describe('xor', () => {
  bench('es-toolkit/xor', () => {
    xorToolkit([1, 2, 3, 4], [3, 4, 5, 6]);
  });

  bench('lodash/xor', () => {
    xorLodash([1, 2, 3, 4], [3, 4, 5, 6]);
  });
});
