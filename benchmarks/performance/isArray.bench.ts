import { bench, describe } from 'vitest';
import { isArray as isArrayToolkit } from 'es-toolkit/compat';
import { isArray as isArrayLodash } from 'lodash';

describe('isArray', () => {
  bench('es-toolkit/isArray', () => {
    isArrayToolkit([1, 2, 3]);
    isArrayToolkit('abc');
    isArrayToolkit(() => {});
  });

  bench('lodash/isArray', () => {
    isArrayLodash([1, 2, 3]);
    isArrayLodash('abc');
    isArrayLodash(() => {});
  });
});
