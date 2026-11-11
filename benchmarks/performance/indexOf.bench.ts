import { indexOf as indexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('indexOf', () => {
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN'];

  bench('es-toolkit/compat/indexOf', () => {
    do_not_optimize(indexOfToolkitCompat(array, 3));
    do_not_optimize(indexOfToolkitCompat(array, NaN));
    do_not_optimize(indexOfToolkitCompat(array, '1'));
    do_not_optimize(indexOfToolkitCompat(array, 'NaN', -5));
    do_not_optimize(indexOfToolkitCompat(array, 'NaN', -100));
  });

  bench('lodash/indexOf', () => {
    do_not_optimize(lodash.indexOf(array, 3));
    do_not_optimize(lodash.indexOf(array, NaN));
    do_not_optimize(lodash.indexOf(array, '1'));
    do_not_optimize(lodash.indexOf(array, 'NaN', -5));
    do_not_optimize(lodash.indexOf(array, 'NaN', -100));
  });
});
