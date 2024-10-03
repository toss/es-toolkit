import { bench, describe } from 'vitest';
import { union as unionToolkit_ } from 'es-toolkit';
import { union as unionLodash_ } from 'lodash';

const unionToolkit = unionToolkit_;
const unionLodash = unionLodash_;

describe('union', () => {
  bench('es-toolkit/union', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    unionToolkit(array1, array2);
  });

  bench('lodash/union', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    unionLodash(array1, array2);
  });
});

describe('union/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => i + 5000);

  bench('es-toolkit/union', () => {
    unionToolkit(largeArray1, largeArray2);
  });

  bench('lodash/union', () => {
    unionLodash(largeArray1, largeArray2);
  });
});
