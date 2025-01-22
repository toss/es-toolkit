import { bench, describe } from 'vitest';
import { rangeRight as rangeRightToolkit_ } from 'es-toolkit';
import { rangeRight as rangeRightCompatToolkiTt_ } from 'es-toolkit/compat';
import { rangeRight as rangeRightLodash_ } from 'lodash';

const rangeRightToolkit = rangeRightToolkit_;
const rangeRightCompatToolkit = rangeRightCompatToolkiTt_;
const rangeRightLodash = rangeRightLodash_;

describe('rangeRight', () => {
  bench('es-toolkit/rangeRight', () => {
    rangeRightToolkit(0, 100, 1);
  });

  bench('es-toolkit/compat/rangeRight', () => {
    rangeRightCompatToolkit(0, 100, 1);
  });

  bench('lodash/rangeRight', () => {
    rangeRightLodash(0, 100, 1);
  });
});
