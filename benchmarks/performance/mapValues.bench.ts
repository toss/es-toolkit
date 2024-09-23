import { bench, describe } from 'vitest';
import { mapValues as mapValuesToolkit } from 'es-toolkit';
import { mapValues as mapValuesCompatToolkit } from 'es-toolkit/compat';
import { mapValues as mapValuesLodash } from 'lodash';

describe('mapValues', () => {
  bench('es-toolkit/mapValues', () => {
    mapValuesToolkit({ a: 1, b: 2, c: 3 }, value => `${value}a`);
  });

  bench('es-toolkit/compat/mapValues', () => {
    mapValuesCompatToolkit({ a: 1, b: 2, c: 3 }, value => `${value}a`);
  });

  bench('lodash/mapValues', () => {
    mapValuesLodash({ a: 1, b: 2, c: 3 }, value => `${value}a`);
  });
});
