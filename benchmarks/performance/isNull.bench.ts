import { isNull as isNullToolkit } from 'es-toolkit';
import { isNull as isNullToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isNull', () => {
  bench('es-toolkit/isNull', () => {
    isNullToolkit(null);
    isNullToolkit(undefined);
    isNullToolkit('');
    isNullToolkit(123);
  });

  bench('es-toolkit/compat/isNull', () => {
    isNullToolkitCompat(null);
    isNullToolkitCompat(undefined);
    isNullToolkitCompat('');
    isNullToolkitCompat(123);
  });

  bench('lodash/isNull', () => {
    lodash.isNull(null);
    lodash.isNull(undefined);
    lodash.isNull('');
    lodash.isNull(123);
  });
});
