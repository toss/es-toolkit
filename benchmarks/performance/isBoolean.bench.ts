import { isBoolean as isBooleanToolkit } from 'es-toolkit';
import { isBoolean as isBooleanToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isBoolean', () => {
  bench('es-toolkit/isBoolean', () => {
    do_not_optimize(isBooleanToolkit(true));
    do_not_optimize(isBooleanToolkit(false));
    do_not_optimize(isBooleanToolkit(undefined));
    do_not_optimize(isBooleanToolkit(''));
    do_not_optimize(isBooleanToolkit(123));
    do_not_optimize(isBooleanToolkit({}));
    do_not_optimize(isBooleanToolkit(Boolean()));
  });

  bench('es-toolkit/compat/isBoolean', () => {
    do_not_optimize(isBooleanToolkitCompat(true));
    do_not_optimize(isBooleanToolkitCompat(false));
    do_not_optimize(isBooleanToolkitCompat(undefined));
    do_not_optimize(isBooleanToolkitCompat(''));
    do_not_optimize(isBooleanToolkitCompat(123));
    do_not_optimize(isBooleanToolkitCompat({}));
    do_not_optimize(isBooleanToolkitCompat(Boolean()));
  });

  bench('lodash/isBoolean', () => {
    do_not_optimize(lodash.isBoolean(true));
    do_not_optimize(lodash.isBoolean(false));
    do_not_optimize(lodash.isBoolean(undefined));
    do_not_optimize(lodash.isBoolean(''));
    do_not_optimize(lodash.isBoolean(123));
    do_not_optimize(lodash.isBoolean({}));
    do_not_optimize(lodash.isBoolean(Boolean()));
  });
});
