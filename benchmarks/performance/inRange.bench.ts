import { bench, describe } from 'vitest';
import { inRange as inRangeToolkit_ } from 'es-toolkit';
import { inRange as inRangeCompatToolkit_ } from 'es-toolkit/compat';
import { inRange as inRangeLodash_ } from 'lodash';

const inRangeToolkit = inRangeToolkit_;
const inRangeCompatToolkit = inRangeCompatToolkit_;
const inRangeLodash = inRangeLodash_;

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
