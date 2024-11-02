import { bench, describe } from 'vitest';
import { mean as meanToolkit_ } from 'es-toolkit';
import { mean as meanLodash_ } from 'lodash';

const meanToolkit = meanToolkit_;
const meanLodash = meanLodash_;

describe('mean', () => {
  bench('es-toolkit/mean', () => {
    meanToolkit([1, 2, 3]);
  });

  bench('lodash/mean', () => {
    meanLodash([1, 2, 3]);
  });
});

describe('mean/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/mean', () => {
    meanToolkit(largeArray);
  });

  bench('lodash/mean', () => {
    meanLodash(largeArray);
  });
});
