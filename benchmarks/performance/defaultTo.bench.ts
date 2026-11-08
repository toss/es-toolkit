import { defaultTo as defaultToToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('defaultTo', () => {
  bench('es-toolkit/compat/defaultTo', () => {
    defaultToToolkitCompat(null, 123);
    defaultToToolkitCompat(undefined, '64');
    defaultToToolkitCompat(NaN, 0);
    defaultToToolkitCompat(true, 0);
    defaultToToolkitCompat(123, 0);
  });

  bench('lodash/defaultTo', () => {
    lodash.defaultTo(null, 123);
    lodash.defaultTo(undefined, '64');
    lodash.defaultTo(NaN, 0);
    lodash.defaultTo(true, 0);
    lodash.defaultTo(123, 0);
  });
});
