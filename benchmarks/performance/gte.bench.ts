import { gte as gteToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('gte', () => {
  bench('es-toolkit/compat/gte', () => {
    gteToolkitCompat(3, 1);
    gteToolkitCompat(3, 3);
    gteToolkitCompat(1, 3);
  });

  bench('lodash/gte', () => {
    lodash.gte(3, 1);
    lodash.gte(3, 3);
    lodash.gte(1, 3);
  });
});
