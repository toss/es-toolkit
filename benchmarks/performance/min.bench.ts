import { bench, describe } from 'vitest';
import { min as minToolkit_ } from 'es-toolkit/compat';
import { min as minLodash_ } from 'lodash';

const minToolkit = minToolkit_;
const minLodash = minLodash_;

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
