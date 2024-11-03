import { bench, describe } from 'vitest';
import { sum as sumToolkit_ } from 'es-toolkit';
import { sum as sumToolkitCompat_ } from 'es-toolkit/compat';
import { sum as sumLodash_ } from 'lodash';

const sumToolkit = sumToolkit_;
const sumToolkitCompat = sumToolkitCompat_;
const sumLodash = sumLodash_;

describe('sum', () => {
  bench('es-toolkit/sum', () => {
    sumToolkit([1, 2, 3]);
  });

  bench('es-toolkit/compat/sum', () => {
    sumToolkitCompat([1, 2, 3]);
  });

  bench('lodash/sum', () => {
    sumLodash([1, 2, 3]);
  });
});

describe('sum/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sum', () => {
    sumToolkit(largeArray);
  });

  bench('es-toolkit/compat/sum', () => {
    sumToolkitCompat(largeArray);
  });

  bench('lodash/sum', () => {
    sumLodash(largeArray);
  });
});
