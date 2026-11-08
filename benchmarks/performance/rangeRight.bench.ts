import { rangeRight as rangeRightToolkit } from 'es-toolkit';
import { rangeRight as rangeRightCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('rangeRight', () => {
  bench('es-toolkit/rangeRight', () => {
    rangeRightToolkit(0, 100, 1);
  });

  bench('es-toolkit/compat/rangeRight', () => {
    rangeRightCompatToolkit(0, 100, 1);
  });

  bench('lodash/rangeRight', () => {
    lodash.rangeRight(0, 100, 1);
  });
});
