import { bench, describe } from 'vitest';
import { rangeRight as rangeRightToolkit } from 'es-toolkit';
import { rangeRight as rangeRightCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { rangeRight: rangeRightLodash } = lodash;

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
