import { valuesIn as valuesInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = { a: 1, b: 2, c: 3 };

group('valuesIn', () => {
  bench('es-toolkit/compat/valuesIn', () => {
    do_not_optimize(valuesInToolkitCompat(object));
  });

  bench('lodash/valuesIn', () => {
    do_not_optimize(lodash.valuesIn(object));
  });
});
