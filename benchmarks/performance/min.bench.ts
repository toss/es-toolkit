import { min as minToolkit } from 'es-toolkit/compat';
import { min as minLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('min', () => {
  bench('es-toolkit/min', () => {
    minToolkit([1, 2, 3]);
  });

  bench('lodash/min', () => {
    minLodash([1, 2, 3]);
  });
});

describe('min/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/min', () => {
    minToolkit(largeArray);
  });

  bench('lodash/min', () => {
    minLodash(largeArray);
  });
});
