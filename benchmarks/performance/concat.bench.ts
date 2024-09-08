import { bench, describe } from 'vitest';
import { concat as concatToolkit } from 'es-toolkit/compat';
import { concat as concatLodash } from 'lodash';

describe('concat', () => {
  bench('es-toolkit/concat', () => {
    concatToolkit([1, [2, 3]], 4);
  });

  bench('lodash/concat', () => {
    concatLodash([1, [2, 3]], 4);
  });
});
