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
