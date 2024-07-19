import { bench, describe } from 'vitest';
import { max as maxToolkit } from 'es-toolkit/compat';
import { max as maxLodash } from 'lodash';

describe('max', () => {
  bench('es-toolkit/max', () => {
    maxToolkit([1, 2, 3]);
  });

  bench('lodash/max', () => {
    maxLodash([1, 2, 3]);
  });
});
