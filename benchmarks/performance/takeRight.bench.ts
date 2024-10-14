import { takeRight as takeRightToolkit } from 'es-toolkit';
import { takeRight as takeRightToolkitCompat } from 'es-toolkit/compat';
import { takeRight as takeRightLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('takeRight', () => {
  bench('es-toolkit/takeRight', () => {
    takeRightToolkit([1, 2, 3, 4], 2);
  });

  bench('es-toolkit/compat/takeRight', () => {
    takeRightToolkitCompat([1, 2, 3, 4], 2);
  });

  bench('lodash/takeRight', () => {
    takeRightLodash([1, 2, 3, 4], 2);
  });
});

describe('takeRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRight', () => {
    takeRightToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/takeRight', () => {
    takeRightToolkitCompat(largeArray, 100);
  });

  bench('lodash/takeRight', () => {
    takeRightLodash(largeArray, 100);
  });
});
