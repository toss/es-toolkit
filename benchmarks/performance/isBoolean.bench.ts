import { isBoolean as isBooleanToolkit } from 'es-toolkit';
import { isBoolean as isBooleanToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isBoolean', () => {
  bench('es-toolkit/isBoolean', () => {
    isBooleanToolkit(true);
    isBooleanToolkit(false);
    isBooleanToolkit(undefined);
    isBooleanToolkit('');
    isBooleanToolkit(123);
    isBooleanToolkit({});
    isBooleanToolkit(Boolean());
  });

  bench('es-toolkit/compat/isBoolean', () => {
    isBooleanToolkitCompat(true);
    isBooleanToolkitCompat(false);
    isBooleanToolkitCompat(undefined);
    isBooleanToolkitCompat('');
    isBooleanToolkitCompat(123);
    isBooleanToolkitCompat({});
    isBooleanToolkitCompat(Boolean());
  });

  bench('lodash/isBoolean', () => {
    lodash.isBoolean(true);
    lodash.isBoolean(false);
    lodash.isBoolean(undefined);
    lodash.isBoolean('');
    lodash.isBoolean(123);
    lodash.isBoolean({});
    lodash.isBoolean(Boolean());
  });
});
