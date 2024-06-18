import { bench, describe } from 'vitest';
import { takeRight as takeRightToolkit } from 'es-toolkit';
import { takeRight as takeRightLodash } from 'lodash';

describe('takeRight', () => {
  bench('es-toolkit/takeRight', () => {
    takeRightToolkit([1, 2, 3, 4], 2);
  });

  bench('lodash/takeRight', () => {
    takeRightLodash([1, 2, 3, 4], 2);
  });
});
