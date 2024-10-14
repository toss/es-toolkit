import { concat as concatToolkit } from 'es-toolkit/compat';
import { concat as concatLodash } from 'lodash';
import { bench, describe } from '../bench';

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
