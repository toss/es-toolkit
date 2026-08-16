import { bench, describe } from 'vitest';
import { mapKeys as mapKeysToolkit } from 'es-toolkit';
import { mapKeys as mapKeysCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { mapKeys: mapKeysLodash } = lodash;

describe('mapKeys', () => {
  bench('es-toolkit/mapKeys', () => {
    mapKeysToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });

  bench('es-toolkit/compat/mapKeys', () => {
    mapKeysCompatToolkit({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });

  bench('lodash/mapKeys', () => {
    mapKeysLodash({ a: 1, b: 2, c: 3 }, (_value, key) => `${key}a`);
  });
});
