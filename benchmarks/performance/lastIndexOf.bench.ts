import { lastIndexOf as indexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('lastIndexOf', () => {
  const largeArray = Array(1_000_000)
    .fill(0)
    .map((_, i) => i);
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN', ...largeArray];

  bench('es-toolkit/compat/lastIndexOf', () => {
    indexOfToolkitCompat(array, 1);
    indexOfToolkitCompat(array, NaN);
    indexOfToolkitCompat(array, '1');
    indexOfToolkitCompat(array, 'NaN', -5);
    indexOfToolkitCompat(array, 'NaN', -100);
  });

  bench('lodash/lastIndexOf', () => {
    lodash.lastIndexOf(array, 1);
    lodash.lastIndexOf(array, NaN);
    lodash.lastIndexOf(array, '1');
    lodash.lastIndexOf(array, 'NaN', -5);
    lodash.lastIndexOf(array, 'NaN', -100);
  });
});
