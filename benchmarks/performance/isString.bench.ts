import { bench, describe } from 'vitest';
import { isString as isStringToolkit } from 'es-toolkit';
import { isString as isStringCompatToolkit } from 'es-toolkit/compat';
import { isString as isStringLodash } from 'lodash';

describe('isString', () => {
  bench('es-toolkit/isString', () => {
    isStringToolkit('');
    isStringToolkit(true);
    isStringToolkit(undefined);
    isStringToolkit(123);
  });

  bench('es-toolkit/compat/isString', () => {
    isStringCompatToolkit('');
    isStringCompatToolkit(true);
    isStringCompatToolkit(undefined);
    isStringCompatToolkit(123);
  });

  bench('lodash/isString', () => {
    isStringLodash('');
    isStringLodash(true);
    isStringLodash(undefined);
    isStringLodash(123);
  });
});
