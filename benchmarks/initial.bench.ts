import { bench, describe } from 'vitest';
import { initial as lodashInitial } from 'lodash';
import { initial as esToolkitInitial } from 'es-toolkit'; // hypothetical library

// Helper function to generate a large array
function generateLargeArray(size) {
  return Array.from({ length: size }, (_, index) => index);
}

describe('initial function performance', () => {
  const largeArray = generateLargeArray(1000000); // 1 million elements

  bench('es-toolkit/initial', () => {
    esToolkitInitial(largeArray);
  });

  bench('lodash/initial', () => {
    lodashInitial(largeArray);
  });
});
