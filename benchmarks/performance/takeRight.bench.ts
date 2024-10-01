import { bench, describe } from 'vitest';
import { takeRight as takeRightToolkit_ } from 'es-toolkit';
import { takeRight as takeRightLodash_ } from 'lodash';

const takeRightToolkit = takeRightToolkit_;
const takeRightLodash = takeRightLodash_;

describe('takeRight', () => {
  bench('es-toolkit/takeRight', () => {
    takeRightToolkit([1, 2, 3, 4], 2);
  });

  bench('lodash/takeRight', () => {
    takeRightLodash([1, 2, 3, 4], 2);
  });
});
