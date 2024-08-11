import { bench, describe } from 'vitest';
import { indexOf as indexOfToolkitComapt } from 'es-toolkit/compat';
import { indexOf as indexOfLodash } from 'lodash';

describe('indexOf', () => {
  const array = [1, 2, 3, 4, NaN, '1', '2', '3', '4', 'NaN'];

  bench('es-toolkit/compat/indexOf', () => {
    indexOfToolkitComapt(array, 3);
    indexOfToolkitComapt(array, NaN);
    indexOfToolkitComapt(array, '1');
    indexOfToolkitComapt(array, 'NaN', -5);
    indexOfToolkitComapt(array, 'NaN', -100);
  });

  bench('lodash/indexOf', () => {
    indexOfLodash(array, 3);
    indexOfLodash(array, NaN);
    indexOfLodash(array, '1');
    indexOfLodash(array, 'NaN', -5);
    indexOfLodash(array, 'NaN', -100);
  });
});
