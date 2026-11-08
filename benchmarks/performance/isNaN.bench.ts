import { isNaN as isNaNToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isNaN', () => {
  bench('es-toolkit/isNaN', () => {
    isNaNToolkit(NaN);
    isNaNToolkit(1);
    isNaNToolkit(null);
    isNaNToolkit(undefined);
    isNaNToolkit('NaN');
  });

  bench('lodash/isNaN', () => {
    lodash.isNaN(NaN);
    lodash.isNaN(1);
    lodash.isNaN(null);
    lodash.isNaN(undefined);
    lodash.isNaN('NaN');
  });
});
