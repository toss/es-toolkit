import { values as valuesToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = { a: 1, b: 2, c: 3 };

group('values', () => {
  bench('es-toolkit/compat/values', () => {
    do_not_optimize(valuesToolkitCompat(object));
  });

  bench('lodash/values', () => {
    do_not_optimize(lodash.values(object));
  });
});
