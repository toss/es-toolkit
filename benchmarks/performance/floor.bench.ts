import { bench, describe } from 'vitest';
import { floor as floorToolkit } from 'es-toolkit/compat';
import { floor as floorLodash } from 'lodash';

describe('floor', () => {
  bench('es-toolkit/floor', () => {
    floorToolkit(4.006);
    floorToolkit(4.006, 0);
    floorToolkit(4.016, 2);
    floorToolkit(4.1, 2);
    floorToolkit(4.4, 2);
    floorToolkit(4160, -2);
    floorToolkit(4.006, NaN);
    floorToolkit(4.016, 2.6);
    floorToolkit(4.016, '+2');
    floorToolkit(5e1, 2);
    floorToolkit('5e', 1);
    floorToolkit('5e1e1', 1);
  });

  bench('lodash/floor', () => {
    floorLodash(4.006);
    floorLodash(4.006, 0);
    floorLodash(4.016, 2);
    floorLodash(4.1, 2);
    floorLodash(4.4, 2);
    floorLodash(4160, -2);
    floorLodash(4.006, NaN);
    floorLodash(4.016, 2.6);
    floorLodash(4.016, '+2');
    floorLodash(5e1, 2);
    floorLodash('5e', 1);
    floorLodash('5e1e1', 1);
  });
});
