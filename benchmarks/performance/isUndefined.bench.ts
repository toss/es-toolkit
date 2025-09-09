import { bench, describe } from 'vitest';
import { isUndefined as isUndefinedToolkit_ } from 'es-toolkit';
import { isUndefined as isUndefinedToolkitCompat_ } from 'es-toolkit/compat';
import { isUndefined as isUndefinedLodash_ } from 'lodash';

const isUndefinedToolkit = isUndefinedToolkit_;
const isUndefinedToolkitCompat = isUndefinedToolkitCompat_;
const isUndefinedLodash = isUndefinedLodash_;

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
