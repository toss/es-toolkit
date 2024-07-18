import { bench, describe } from 'vitest';
import { sum as sumToolkit } from 'es-toolkit';
import { sum as sumLodash } from 'lodash';

describe('sum', () => {
  bench('es-toolkit/sum', () => {
    sumToolkit([1, 2, 3]);
  });

  bench('lodash/sum', () => {
    sumLodash([1, 2, 3]);
  });
});
