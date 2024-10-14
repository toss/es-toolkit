import { range as rangeToolkit } from 'es-toolkit';
import { range as rangeLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('range', () => {
  bench('es-toolkit/range', () => {
    rangeToolkit(0, 100, 1);
  });

  bench('lodash/range', () => {
    rangeLodash(0, 100, 1);
  });
});
