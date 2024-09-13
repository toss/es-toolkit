import { bench, describe } from 'vitest';
import { tail as tailToolkit } from 'es-toolkit';
import { tail as tailLodash } from 'lodash';

describe('tail', () => {
  bench('es-toolkit/tail', () => {
    tailToolkit([1, 2, 3, 4]);
  });

  bench('lodash/tail', () => {
    tailLodash([1, 2, 3, 4]);
  });
});
