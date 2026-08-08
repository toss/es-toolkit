import { bench, describe } from 'vitest';
import { range as rangeToolkit } from 'es-toolkit';
import { range as rangeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { range: rangeLodash } = lodash;

describe('range', () => {
  bench('es-toolkit/range', () => {
    rangeToolkit(0, 100, 1);
  });

  bench('es-toolkit/compat/range', () => {
    rangeCompatToolkit(0, 100, 1);
  });

  bench('lodash/range', () => {
    rangeLodash(0, 100, 1);
  });
});
