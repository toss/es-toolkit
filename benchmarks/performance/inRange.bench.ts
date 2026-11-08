import { inRange as inRangeToolkit } from 'es-toolkit';
import { inRange as inRangeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('inRange', () => {
  bench('es-toolkit/inRange', () => {
    do_not_optimize(inRangeToolkit(3, 5));
  });

  bench('es-toolkit/compat/inRange', () => {
    do_not_optimize(inRangeCompatToolkit(3, 5));
  });

  bench('lodash/inRange', () => {
    do_not_optimize(lodash.inRange(3, 5));
  });
});
