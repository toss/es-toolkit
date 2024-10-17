import { differenceWith as differenceWithToolkit } from 'es-toolkit';
import { differenceWith as differenceWithLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('differenceWith', () => {
  bench('es-toolkit/differenceWith', () => {
    differenceWithToolkit([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/differenceWith', () => {
    differenceWithLodash([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

describe('differenceWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceWith', () => {
    differenceWithToolkit(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/differenceWith', () => {
    differenceWithLodash(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y));
  });
});
