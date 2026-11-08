import { isString as isStringToolkit } from 'es-toolkit';
import { isString as isStringToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isString', () => {
  bench('es-toolkit/isString', () => {
    do_not_optimize(isStringToolkit(''));
    do_not_optimize(isStringToolkit(true));
    do_not_optimize(isStringToolkit(undefined));
    do_not_optimize(isStringToolkit(123));
    do_not_optimize(isStringToolkit(String('')));
    do_not_optimize(isStringToolkit(Object('')));
  });

  bench('es-toolkit/compat/isString', () => {
    do_not_optimize(isStringToolkitCompat(''));
    do_not_optimize(isStringToolkitCompat(true));
    do_not_optimize(isStringToolkitCompat(undefined));
    do_not_optimize(isStringToolkitCompat(123));
    do_not_optimize(isStringToolkitCompat(String('')));
    do_not_optimize(isStringToolkitCompat(Object('')));
  });

  bench('lodash/isString', () => {
    do_not_optimize(lodash.isString(''));
    do_not_optimize(lodash.isString(true));
    do_not_optimize(lodash.isString(undefined));
    do_not_optimize(lodash.isString(123));
    do_not_optimize(lodash.isString(String('')));
    do_not_optimize(lodash.isString(Object('')));
  });
});
