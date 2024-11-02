import { bench, describe } from 'vitest';
import { range as rangeToolkit_ } from 'es-toolkit';
import { range as rangeLodash_ } from 'lodash';

const rangeToolkit = rangeToolkit_;
const rangeLodash = rangeLodash_;

describe('range', () => {
  bench('es-toolkit/range', () => {
    rangeToolkit(0, 100, 1);
  });

  bench('lodash/range', () => {
    rangeLodash(0, 100, 1);
  });
});
