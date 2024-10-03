import { bench, describe } from 'vitest';
import { initial as initialToolkit_ } from 'es-toolkit';
import { initial as initialLodash_ } from 'lodash';

const initialLodash = initialLodash_;
const initialToolkit = initialToolkit_;

// Helper function to generate a large array
function generateLargeArray(size: number) {
  return Array.from({ length: size }, (_, index) => index);
}

describe('initial', () => {
  bench('es-toolkit/initial', () => {
    initialToolkit([1, 2, 3, 4, 5, 6]);
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

  bench('lodash/initial', () => {
    initialLodash(largeArray);
  });
});
