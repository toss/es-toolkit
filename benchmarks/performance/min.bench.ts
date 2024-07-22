import { bench, describe } from 'vitest';
import { min as minToolkit } from 'es-toolkit/compat';
import { min as minLodash } from 'lodash';

describe('min', () => {
  bench('es-toolkit/min', () => {
    minToolkit([1, 2, 3]);
  });

  bench('lodash/min', () => {
    minLodash([1, 2, 3]);
  });
});
