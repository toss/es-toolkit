import { mean as meanToolkit } from 'es-toolkit';
import { mean as meanLodash } from 'lodash';
import { bench, describe } from '../bench';

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
