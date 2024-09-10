import { bench, describe } from 'vitest';
import { ceil as ceilToolkit } from 'es-toolkit/compat';
import { ceil as ceilLodash } from 'lodash';

describe('ceil', () => {
  bench('es-toolkit/ceil', () => {
    ceilToolkit(4.006);
    ceilToolkit(4.006, 0);
    ceilToolkit(4.016, 2);
    ceilToolkit(4.1, 2);
    ceilToolkit(4.4, 2);
    ceilToolkit(4160, -2);
    ceilToolkit(4.006, NaN);
    ceilToolkit(4.016, 2.6);
    ceilToolkit(4.016, '+2');
    ceilToolkit(5e1, 2);
    ceilToolkit('5e', 1);
    ceilToolkit('5e1e1', 1);
  });

  bench('lodash/ceil', () => {
    ceilLodash(4.006);
    ceilLodash(4.006, 0);
    ceilLodash(4.016, 2);
    ceilLodash(4.1, 2);
    ceilLodash(4.4, 2);
    ceilLodash(4160, -2);
    ceilLodash(4.006, NaN);
    ceilLodash(4.016, 2.6);
    ceilLodash(4.016, '+2');
    ceilLodash(5e1, 2);
    ceilLodash('5e', 1);
    ceilLodash('5e1e1', 1);
  });
});
