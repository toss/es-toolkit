import { bench, describe } from 'vitest';
import { initial as initialToolkit } from 'es-toolkit';
import { initial as initialLodash } from 'lodash';

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
