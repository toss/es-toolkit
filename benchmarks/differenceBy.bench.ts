import { bench, describe } from 'vitest';
import { differenceBy as differenceByToolkit } from 'es-toolkit';
import { differenceBy as differenceByLodash } from 'lodash';

describe('differenceBy', () => {
  bench('es-toolkit', () => {
    differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  })

  bench('lodash', () => {
    differenceByLodash([1.2, 2.3, 3.4], [1.2], Math.floor);
  })
});