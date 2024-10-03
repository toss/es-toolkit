import { bench, describe } from 'vitest';
import { isArray as isArrayToolkit_ } from 'es-toolkit/compat';
import { isArray as isArrayLodash_ } from 'lodash';

const isArrayToolkit = isArrayToolkit_;
const isArrayLodash = isArrayLodash_;

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
