import { indexOf as indexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('indexOf', () => {
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN'];

  bench('es-toolkit/compat/indexOf', () => {
    indexOfToolkitCompat(array, 3);
    indexOfToolkitCompat(array, NaN);
    indexOfToolkitCompat(array, '1');
    indexOfToolkitCompat(array, 'NaN', -5);
    indexOfToolkitCompat(array, 'NaN', -100);
  });

  bench('lodash/indexOf', () => {
    lodash.indexOf(array, 3);
    lodash.indexOf(array, NaN);
    lodash.indexOf(array, '1');
    lodash.indexOf(array, 'NaN', -5);
    lodash.indexOf(array, 'NaN', -100);
  });
});
