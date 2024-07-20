import { bench, describe } from 'vitest';
import { isNull as isNullToolKit } from 'es-toolkit';
import { isNull as isNullLodash } from 'lodash';

describe('isNull', () => {
  bench('es-toolkit/isNull', () => {
    isNullToolKit(null);
    isNullToolKit(undefined);
    isNullToolKit('');
    isNullToolKit(123);
  });

  bench('lodash/isNull', () => {
    isNullLodash(null);
    isNullLodash(undefined);
    isNullLodash('');
    isNullLodash(123);
  });
});
