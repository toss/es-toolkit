import { gt as gtToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('gt', () => {
  bench('es-toolkit/compat/gt', () => {
    gtToolkitCompat(3, 1);
    gtToolkitCompat(3, 3);
    gtToolkitCompat(1, 3);
  });

  bench('lodash/gt', () => {
    lodash.gt(3, 1);
    lodash.gt(3, 3);
    lodash.gt(1, 3);
  });
});
