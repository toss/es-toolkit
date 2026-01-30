import { bench, describe } from 'vitest';
import { difference as differenceToolkit_ } from 'es-toolkit';
import { difference as differenceCompatToolkit_ } from 'es-toolkit/compat';
import { difference as differenceLodash_ } from 'lodash';
import { difference as differenceLodash_es } from 'lodash-es';

const differenceToolkit = differenceToolkit_;
const differenceCompatToolkit = differenceCompatToolkit_;
const differenceLodash = differenceLodash_;
const differenceLodashEs = differenceLodash_es;

describe('difference', () => {
  bench('es-toolkit/difference', () => {
    differenceToolkit([1, 2, 3], [2]);
  });

  bench('es-toolkit/compat/difference', () => {
    differenceCompatToolkit([1, 2, 3], [2]);
  });

  bench('lodash/difference', () => {
    differenceLodash([1, 2, 3], [2]);
  });

  bench('lodash-es/difference', () => {
    differenceLodashEs([1, 2, 3], [2]);
  });
});

describe('difference/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500);

  bench('es-toolkit/difference', () => {
    differenceToolkit(largeArray, largeArray2);
  });

  bench('es-toolkit/compat/difference', () => {
    differenceCompatToolkit(largeArray, largeArray2);
  });

  bench('lodash/difference', () => {
    differenceLodash(largeArray, largeArray2);
  });

  bench('lodash-es/difference', () => {
    differenceLodashEs(largeArray, largeArray2);
  });
});
