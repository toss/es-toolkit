import { bench, describe } from 'vitest';
import { lastIndexOf as indexOfToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { lastIndexOf: indexOfLodash } = lodash;

describe('lastIndexOf', () => {
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
    indexOfLodash(array, 1);
    indexOfLodash(array, NaN);
    indexOfLodash(array, '1');
    indexOfLodash(array, 'NaN', -5);
    indexOfLodash(array, 'NaN', -100);
  });
});
