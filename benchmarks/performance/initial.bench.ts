import { bench, describe } from 'vitest';
import { initial as initialLodash_ } from 'lodash';
import { initial as initialToolkit_ } from 'es-toolkit';

const initialLodash = initialLodash_;
const initialToolkit = initialToolkit_;

// Helper function to generate a large array
function generateLargeArray(size) {
  return Array.from({ length: size }, (_, index) => index);
}

describe('initial function performance', () => {
  const largeArray = generateLargeArray(1000000);

  bench('es-toolkit/initial', () => {
    initialToolkit(largeArray);
  });

  bench('lodash/initial', () => {
    initialLodash(largeArray);
  });
});
