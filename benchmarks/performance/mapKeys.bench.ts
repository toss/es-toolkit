import { bench, describe } from 'vitest';
import { mapKeys as mapKeysToolkit_ } from 'es-toolkit';
import { mapKeys as mapKeysCompatToolkit_ } from 'es-toolkit/compat';
import { mapKeys as mapKeysLodash_ } from 'lodash';

const mapKeysToolkit = mapKeysToolkit_;
const mapKeysCompatToolkit = mapKeysCompatToolkit_;
const mapKeysLodash = mapKeysLodash_;

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
