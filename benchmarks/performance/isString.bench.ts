import { bench, describe } from 'vitest';
import { isString as isStringToolkit_ } from 'es-toolkit';
import { isString as isStringToolkitCompat_ } from 'es-toolkit/compat';
import { isString as isStringLodash_ } from 'lodash';

const isStringToolkit = isStringToolkit_;
const isStringToolkitCompat = isStringToolkitCompat_;
const isStringLodash = isStringLodash_;

describe('isString', () => {
  bench('es-toolkit/isString', () => {
    isStringToolkit('');
    isStringToolkit(true);
    isStringToolkit(undefined);
    isStringToolkit(123);
    isStringToolkit(String(''));
    isStringToolkit(Object(''));
  });

  bench('es-toolkit/compat/isString', () => {
    isStringToolkitCompat('');
    isStringToolkitCompat(true);
    isStringToolkitCompat(undefined);
    isStringToolkitCompat(123);
    isStringToolkitCompat(String(''));
    isStringToolkitCompat(Object(''));
  });

  bench('lodash/isString', () => {
    isStringLodash('');
    isStringLodash(true);
    isStringLodash(undefined);
    isStringLodash(123);
    isStringLodash(String(''));
    isStringLodash(Object(''));
  });
});
