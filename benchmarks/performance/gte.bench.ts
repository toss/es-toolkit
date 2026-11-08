import { gte as gteToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('gte', () => {
  bench('es-toolkit/compat/gte', () => {
    do_not_optimize(gteToolkitCompat(3, 1));
    do_not_optimize(gteToolkitCompat(3, 3));
    do_not_optimize(gteToolkitCompat(1, 3));
  });

  bench('lodash/gte', () => {
    do_not_optimize(lodash.gte(3, 1));
    do_not_optimize(lodash.gte(3, 3));
    do_not_optimize(lodash.gte(1, 3));
  });
});
