import { bench, describe } from 'vitest';
import { isNil as isNilToolkit } from 'es-toolkit';
import { isNil as isNilLodash } from 'lodash';

describe('isNil', () => {
  bench('es-toolkit/isNil', () => {
    isNilToolkit(null);
    isNilToolkit(undefined);
    isNilToolkit(123);
    isNilToolkit([1, 2, 3]);
  });

  bench('lodash/isNil', () => {
    isNilLodash(null);
    isNilLodash(undefined);
    isNilLodash(123);
    isNilLodash([1, 2, 3]);
  });
});
