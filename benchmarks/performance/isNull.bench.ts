import { bench, describe } from 'vitest';
import { isNull as isNullToolkit } from 'es-toolkit';
import { isNull as isNullLodash } from 'lodash';

describe('isNull', () => {
  bench('es-toolkit/isNull', () => {
    isNullToolkit(null);
    isNullToolkit(undefined);
    isNullToolkit('');
    isNullToolkit(123);
  });

  bench('lodash/isNull', () => {
    isNullLodash(null);
    isNullLodash(undefined);
    isNullLodash('');
    isNullLodash(123);
  });
});
