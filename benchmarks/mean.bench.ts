import { bench, describe } from 'vitest';
import { mean as meanToolkit } from 'es-toolkit';
import { mean as meanLodash } from 'lodash';

describe('mean', () => {
  bench('es-toolkit/mean', () => {
    meanToolkit([1, 2, 3]);
  });

  bench('lodash/mean', () => {
    meanLodash([1, 2, 3]);
  });
});
