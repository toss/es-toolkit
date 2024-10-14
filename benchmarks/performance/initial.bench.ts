import { initial as initialToolkit } from 'es-toolkit';
import { initial as initialToolkitCompat } from 'es-toolkit/compat';
import { initial as initialLodash } from 'lodash';
import { bench, describe } from '../bench';

// Helper function to generate a large array
function generateLargeArray(size: number) {
  return Array.from({ length: size }, (_, index) => index);
}

describe('initial', () => {
  bench('es-toolkit/initial', () => {
    initialToolkit([1, 2, 3, 4, 5, 6]);
  });

  bench('es-toolkit/compat/initial', () => {
    initialToolkitCompat([1, 2, 3, 4, 5, 6]);
  });

  bench('lodash/initial', () => {
    initialLodash([1, 2, 3, 4, 5, 6]);
  });
});

describe('initial/largeArray', () => {
  const largeArray = generateLargeArray(1000000);

  bench('es-toolkit/initial', () => {
    initialToolkit(largeArray);
  });

  bench('es-toolkit/compat/initial', () => {
    initialToolkitCompat(largeArray);
  });

  bench('lodash/initial', () => {
    initialLodash(largeArray);
  });
});
