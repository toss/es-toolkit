import { values as valuesToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = { a: 1, b: 2, c: 3 };

group('values', () => {
  bench('es-toolkit/compat/values', () => {
    valuesToolkitCompat(object);
  });

  bench('lodash/values', () => {
    lodash.values(object);
  });
});
