import { bench, describe } from 'vitest';
import { values as valuesToolkitCompat_ } from 'es-toolkit/compat';
import { values as valuesLodash_ } from 'lodash';

const valuesToolkitCompat = valuesToolkitCompat_;
const valuesLodash = valuesLodash_;

const object = { a: 1, b: 2, c: 3 };

describe('values', () => {
  bench('es-toolkit/compat/values', () => {
    valuesToolkitCompat(object);
  });

  bench('lodash/values', () => {
    valuesLodash(object);
  });
});
