import { bench, describe } from 'vitest';
import { take as takeToolkit_ } from 'es-toolkit';
import { take as takeToolkitCompat_ } from 'es-toolkit/compat';
import { take as takeLodash_ } from 'lodash';

const takeToolkit = takeToolkit_;
const takeToolkitCompat = takeToolkitCompat_;
const takeLodash = takeLodash_;

describe('take', () => {
  bench('es-toolkit/take', () => {
    takeToolkit([1, 2, 3, 4], 2);
  });

  bench('es-toolkit/compat/take', () => {
    takeToolkitCompat([1, 2, 3, 4], 2);
  });

  bench('lodash/take', () => {
    takeLodash([1, 2, 3, 4], 2);
  });
});

describe('take/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/take', () => {
    takeToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/take', () => {
    takeToolkitCompat(largeArray, 100);
  });

  bench('lodash/take', () => {
    takeLodash(largeArray, 100);
  });
});
