import { ceil as ceilToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('ceil', () => {
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
    lodash.ceil(4.006);
    lodash.ceil(4.006, 0);
    lodash.ceil(4.016, 2);
    lodash.ceil(4.1, 2);
    lodash.ceil(4.4, 2);
    lodash.ceil(4160, -2);
    lodash.ceil(4.006, NaN);
    lodash.ceil(4.016, 2.6);
    lodash.ceil(4.016, '+2');
    lodash.ceil(5e1, 2);
    lodash.ceil('5e', 1);
    lodash.ceil('5e1e1', 1);
  });
});
