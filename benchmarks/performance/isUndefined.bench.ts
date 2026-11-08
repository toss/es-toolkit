import { isUndefined as isUndefinedToolkit } from 'es-toolkit';
import { isUndefined as isUndefinedToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isUndefined', () => {
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
    lodash.isUndefined(undefined);
    lodash.isUndefined(null);
    lodash.isUndefined('');
    lodash.isUndefined(123);
  });
});
