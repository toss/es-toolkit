import { isString as isStringToolkit } from 'es-toolkit';
import { isString as isStringToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isString', () => {
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
    lodash.isString('');
    lodash.isString(true);
    lodash.isString(undefined);
    lodash.isString(123);
    lodash.isString(String(''));
    lodash.isString(Object(''));
  });
});
