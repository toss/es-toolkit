import { bench, describe } from 'vitest';
import { differenceBy as differenceByToolkit_ } from 'es-toolkit';
import { differenceBy as differenceByToolkitCompat_ } from 'es-toolkit/compat';
import { differenceBy as differenceByLodash_ } from 'lodash';

const differenceByToolkit = differenceByToolkit_;
const differenceByToolkitCompat = differenceByToolkitCompat_;
const differenceByLodash = differenceByLodash_;

describe('differenceBy', () => {
  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('es-toolkit/compat/differenceBy', () => {
    differenceByToolkitCompat([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash([1.2, 2.3, 3.4], [1.2], Math.floor);
  });
});

describe('differenceBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit(largeArray, largeArray2, Math.floor);
  });

  bench('es-toolkit/compat/differenceBy', () => {
    differenceByToolkitCompat(largeArray, largeArray2, Math.floor);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash(largeArray, largeArray2, Math.floor);
  });
});
