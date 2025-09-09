import { bench, describe } from 'vitest';
import { valuesIn as valuesInToolkitCompat_ } from 'es-toolkit/compat';
import { valuesIn as valuesInLodash_ } from 'lodash';

const valuesInToolkitCompat = valuesInToolkitCompat_;
const valuesInLodash = valuesInLodash_;

const object = { a: 1, b: 2, c: 3 };

describe('valuesIn', () => {
  bench('es-toolkit/compat/valuesIn', () => {
    valuesInToolkitCompat(object);
  });

  bench('lodash/valuesIn', () => {
    valuesInLodash(object);
  });
});
