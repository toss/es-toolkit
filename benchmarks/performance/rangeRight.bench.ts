import { rangeRight as rangeRightToolkit } from 'es-toolkit';
import { rangeRight as rangeRightLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('rangeRight', () => {
  bench('es-toolkit/rangeRight', () => {
    rangeRightToolkit(0, 100, 1);
  });

  bench('lodash/rangeRight', () => {
    rangeRightLodash(0, 100, 1);
  });
});
