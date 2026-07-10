import { bench, describe } from 'vitest';
import { concat as concatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { concat: concatLodash } = lodash;

describe('concat', () => {
  bench('es-toolkit/concat', () => {
    concatToolkit([1, [2, 3]], 4);
  });

  bench('lodash/concat', () => {
    concatLodash([1, [2, 3]], 4);
  });
});

describe('concat/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/concat', () => {
    concatToolkit(largeArray, largeArray);
  });

  bench('lodash/concat', () => {
    concatLodash(largeArray, largeArray);
  });
});
