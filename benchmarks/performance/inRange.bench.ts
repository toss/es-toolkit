import { inRange as inRangeToolkit } from 'es-toolkit';
import { inRange as inRangeCompatToolkit } from 'es-toolkit/compat';
import { inRange as inRangeLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('inRange', () => {
  bench('es-toolkit/inRange', () => {
    inRangeToolkit(3, 5);
  });

  bench('es-toolkit/compat/inRange', () => {
    inRangeCompatToolkit(3, 5);
  });

  bench('lodash/inRange', () => {
    inRangeLodash(3, 5);
  });
});
