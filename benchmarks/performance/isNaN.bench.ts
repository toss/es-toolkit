import { bench, describe } from 'vitest';
import { isNaN as isNaNToolkit } from 'es-toolkit';
import { isNaN as isNaNLodash } from 'lodash';

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
