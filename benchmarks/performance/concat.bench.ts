import { bench, describe } from 'vitest';
import { concat as concatToolkit } from 'es-toolkit';
import { concat as concatLodash } from 'lodash';

const arr = Array.from({ length: 10 }, (_, i) => i);

describe('concat', () => {
  bench('es-toolkit/concat', () => {
    concatToolkit(arr, arr, arr, arr, arr);
  });

  bench('lodash/concat', () => {
    concatLodash(arr, arr, arr, arr, arr);
  });
});
