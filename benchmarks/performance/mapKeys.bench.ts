import { mapKeys as mapKeysToolkit } from 'es-toolkit';
import { mapKeys as mapKeysCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('mapKeys', () => {
  bench('es-toolkit/mapKeys', () => {
    mapKeysToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });

  bench('es-toolkit/compat/mapKeys', () => {
    mapKeysCompatToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });

  bench('lodash/mapKeys', () => {
    lodash.mapKeys({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });
});
