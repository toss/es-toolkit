import { bench, describe } from 'vitest';
import { concat as concatToolkit_ } from 'es-toolkit/compat';
import { concat as concatLodash_ } from 'lodash';

const concatToolkit = concatToolkit_;
const concatLodash = concatLodash_;

describe('concat', () => {
  bench('es-toolkit/concat', () => {
    concatToolkit([1, [2, 3]], 4);
  });

  bench('lodash/concat', () => {
    concatLodash([1, [2, 3]], 4);
  });
});
