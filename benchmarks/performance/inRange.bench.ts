import { inRange as inRangeToolkit } from 'es-toolkit';
import { inRange as inRangeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('inRange', () => {
  bench('es-toolkit/inRange', () => {
    inRangeToolkit(3, 5);
  });

  bench('es-toolkit/compat/inRange', () => {
    inRangeCompatToolkit(3, 5);
  });

  bench('lodash/inRange', () => {
    lodash.inRange(3, 5);
  });
});
