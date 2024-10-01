import { bench, describe } from 'vitest';
import { isNaN as isNaNToolkit_ } from 'es-toolkit/compat';
import { isNaN as isNaNLodash_ } from 'lodash';

const isNaNToolkit = isNaNToolkit_;
const isNaNLodash = isNaNLodash_;

describe('isNaN', () => {
  bench('es-toolkit/isNaN', () => {
    isNaNToolkit(NaN);
    isNaNToolkit(1);
    isNaNToolkit(null);
    isNaNToolkit(undefined);
    isNaNToolkit('NaN');
  });

  bench('lodash/isNaN', () => {
    isNaNLodash(NaN);
    isNaNLodash(1);
    isNaNLodash(null);
    isNaNLodash(undefined);
    isNaNLodash('NaN');
  });
});
