import { bench, describe } from 'vitest';
import { without as withoutEsToolkit } from 'es-toolkit';
import { without as withoutLodash } from 'lodash';

const generateArray = (length: number, max: number) => Array.from({ length }, () => Math.floor(Math.random() * max));

describe('without, small arrays', () => {
  const array = [1, 2, 3, 4, 5];
  const values = [2, 4];

  bench('es-toolkit/without', () => {
    withoutEsToolkit(array, ...values);
  });

  bench('lodash/without', () => {
    withoutLodash(array, ...values);
  });
});

describe('without, large arrays', () => {
  const array = generateArray(10000, 1000);
  const values = generateArray(100, 1000);

  bench('es-toolkit/without', () => {
    withoutEsToolkit(array, ...values);
  });

  bench('lodash/without', () => {
    withoutLodash(array, ...values);
  });
});
