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

describe('xor/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => i + 5000);

  bench('es-toolkit/xor', () => {
    xorToolkit(largeArray1, largeArray2);
  });

  bench('lodash/xor', () => {
    xorLodash(largeArray1, largeArray2);
  });
});
