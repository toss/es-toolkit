import { floor as floorToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('floor', () => {
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
    lodash.floor(4.006);
    lodash.floor(4.006, 0);
    lodash.floor(4.016, 2);
    lodash.floor(4.1, 2);
    lodash.floor(4.4, 2);
    lodash.floor(4160, -2);
    lodash.floor(4.006, NaN);
    lodash.floor(4.016, 2.6);
    lodash.floor(4.016, '+2');
    lodash.floor(5e1, 2);
    lodash.floor('5e', 1);
    lodash.floor('5e1e1', 1);
  });
});
