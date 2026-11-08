import { valuesIn as valuesInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = { a: 1, b: 2, c: 3 };

group('valuesIn', () => {
  bench('es-toolkit/compat/valuesIn', () => {
    valuesInToolkitCompat(object);
  });

  bench('lodash/valuesIn', () => {
    lodash.valuesIn(object);
  });
});
