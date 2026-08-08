import { bench, describe } from 'vitest';
import { valuesIn as valuesInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { valuesIn: valuesInLodash } = lodash;

const object = { a: 1, b: 2, c: 3 };

describe('valuesIn', () => {
  bench('es-toolkit/compat/valuesIn', () => {
    valuesInToolkitCompat(object);
  });

  bench('lodash/valuesIn', () => {
    valuesInLodash(object);
  });
});
