import { bench, describe } from 'vitest';
import { min as minToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { min: minLodash } = lodash;

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
