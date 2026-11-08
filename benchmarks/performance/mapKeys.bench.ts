import { mapKeys as mapKeysToolkit } from 'es-toolkit';
import { mapKeys as mapKeysCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('mapKeys', () => {
  bench('es-toolkit/mapKeys', () => {
    do_not_optimize(mapKeysToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`));
  });

  bench('es-toolkit/compat/mapKeys', () => {
    do_not_optimize(mapKeysCompatToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`));
  });

  bench('lodash/mapKeys', () => {
    do_not_optimize(lodash.mapKeys({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`));
  });
});
