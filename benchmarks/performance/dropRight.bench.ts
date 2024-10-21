import { dropRight as dropRightToolkit } from 'es-toolkit';
import { dropRight as dropRightToolkitCompat } from 'es-toolkit/compat';
import { dropRight as dropRightLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('dropRight', () => {
  bench('es-toolkit/dropRight', () => {
    dropRightToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/dropRight', () => {
    dropRightToolkitCompat([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/dropRight', () => {
    dropRightLodash([1, 2, 3, 4, 5, 6], 3);
  });
});

describe('dropRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRight', () => {
    dropRightToolkit(largeArray, 5000);
  });

  bench('es-toolkit/compat/dropRight', () => {
    dropRightToolkitCompat(largeArray, 5000);
  });

  bench('lodash/dropRight', () => {
    dropRightLodash(largeArray, 5000);
  });
});
