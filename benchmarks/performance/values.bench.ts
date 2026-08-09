import { bench, describe } from 'vitest';
import { values as valuesToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { values: valuesLodash } = lodash;

const object = { a: 1, b: 2, c: 3 };

describe('values', () => {
  bench('es-toolkit/compat/values', () => {
    valuesToolkitCompat(object);
  });

  bench('lodash/values', () => {
    valuesLodash(object);
  });
});
