import { bench, describe } from 'vitest';
import { isUndefined as isUndefinedToolKit } from 'es-toolkit';
import { isUndefined as isUndefinedLodash } from 'lodash';

describe('isUndefined', () => {
  bench('es-toolkit/isUndefined', () => {
    isUndefinedToolKit(undefined);
    isUndefinedToolKit(null);
    isUndefinedToolKit('');
    isUndefinedToolKit(123);
  });
  bench('lodash/isUndefined', () => {
    isUndefinedLodash(undefined);
    isUndefinedLodash(null);
    isUndefinedLodash('');
    isUndefinedLodash(123);
  });
});
