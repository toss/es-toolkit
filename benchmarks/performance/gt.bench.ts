import { gt as gtToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('gt', () => {
  bench('es-toolkit/compat/gt', () => {
    do_not_optimize(gtToolkitCompat(3, 1));
    do_not_optimize(gtToolkitCompat(3, 3));
    do_not_optimize(gtToolkitCompat(1, 3));
  });

  bench('lodash/gt', () => {
    do_not_optimize(lodash.gt(3, 1));
    do_not_optimize(lodash.gt(3, 3));
    do_not_optimize(lodash.gt(1, 3));
  });
});
