import { bench, describe } from 'vitest';
import { take as takeToolkit } from 'es-toolkit';
import { take as takeLodash } from 'lodash';

describe('take', () => {
  bench('es-toolkit', () => {
    takeToolkit([1, 2, 3, 4], 2);
  })

  bench('lodash', () => {
    takeLodash([1, 2, 3, 4], 2);
  })
});