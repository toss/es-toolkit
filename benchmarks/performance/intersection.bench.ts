import { intersection as intersectionToolkit } from 'es-toolkit';
import { intersection as intersectionCompatToolkit } from 'es-toolkit/compat';
import { intersection as intersectionLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('intersection, small arrays', () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 4];

  bench('es-toolkit/intersection', () => {
    intersectionToolkit(array1, array2);
  });

  bench('es-toolkit/compat/intersection', () => {
    intersectionCompatToolkit([1, 2, 3], [2]);
  });

  bench('lodash/intersection', () => {
    intersectionLodash(array1, array2);
  });
});

describe('intersection, large arrays', () => {
  const array1 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
  const array2 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  bench('es-toolkit/intersection', () => {
    intersectionToolkit(array1, array2);
  });

  bench('es-toolkit/compat/intersection', () => {
    intersectionCompatToolkit(array1, array2);
  });

  bench('lodash/intersection', () => {
    intersectionLodash(array1, array2);
  });
});
