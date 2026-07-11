import { bench, describe } from 'vitest';
import { isUndefined as isUndefinedToolkit } from 'es-toolkit';
import { isUndefined as isUndefinedToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isUndefined: isUndefinedLodash } = lodash;

describe('isUndefined', () => {
  bench('es-toolkit/isUndefined', () => {
    isUndefinedToolkit(undefined);
    isUndefinedToolkit(null);
    isUndefinedToolkit('');
    isUndefinedToolkit(123);
  });

  bench('es-toolkit/compat/isUndefined', () => {
    isUndefinedToolkitCompat(undefined);
    isUndefinedToolkitCompat(null);
    isUndefinedToolkitCompat('');
    isUndefinedToolkitCompat(123);
  });

  bench('lodash/isUndefined', () => {
    isUndefinedLodash(undefined);
    isUndefinedLodash(null);
    isUndefinedLodash('');
    isUndefinedLodash(123);
  });
});
