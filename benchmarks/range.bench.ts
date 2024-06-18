import { bench, describe } from 'vitest';
import { range as rangeToolkit } from 'es-toolkit';
import { range as rangeLodash } from 'lodash';

describe('range', () => {
  bench('es-toolkit', () => {
    rangeToolkit(0, 100, 1);
  });

  bench('lodash', () => {
    rangeLodash(0, 100, 1);
  });
});
