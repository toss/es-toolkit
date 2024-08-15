import { bench, describe } from 'vitest';
import { isString as isStringToolkit } from 'es-toolkit';
import { isString as isStringLodash } from 'lodash';

describe('isString', () => {
  bench('es-toolkit/isString', () => {
    isStringToolkit('');
    isStringToolkit(true);
    isStringToolkit(undefined);
    isStringToolkit(123);
  });

  bench('lodash/isString', () => {
    isStringLodash('');
    isStringLodash(true);
    isStringLodash(undefined);
    isStringLodash(123);
  });
});
