import { bench, describe } from 'vitest';
import { intersection as intersectionToolkit_ } from 'es-toolkit';
import { intersection as intersectionLodash_ } from 'lodash';

const intersectionToolkit = intersectionToolkit_;
const intersectionLodash = intersectionLodash_;

describe('intersection, small arrays', () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 4];

  bench('es-toolkit/intersection', () => {
    intersectionToolkit(array1, array2);
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

  bench('lodash/intersection', () => {
    intersectionLodash(array1, array2);
  });
});
