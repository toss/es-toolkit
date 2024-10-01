import { bench, describe } from 'vitest';
import { indexOf as indexOfToolkitCompat_ } from 'es-toolkit/compat';
import { indexOf as indexOfLodash_ } from 'lodash';

const indexOfToolkitCompat = indexOfToolkitCompat_;
const indexOfLodash = indexOfLodash_;

describe('indexOf', () => {
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN'];

  bench('es-toolkit/compat/indexOf', () => {
    indexOfToolkitCompat(array, 3);
    indexOfToolkitCompat(array, NaN);
    indexOfToolkitCompat(array, '1');
    indexOfToolkitCompat(array, 'NaN', -5);
    indexOfToolkitCompat(array, 'NaN', -100);
  });

  bench('lodash/indexOf', () => {
    indexOfLodash(array, 3);
    indexOfLodash(array, NaN);
    indexOfLodash(array, '1');
    indexOfLodash(array, 'NaN', -5);
    indexOfLodash(array, 'NaN', -100);
  });
});
