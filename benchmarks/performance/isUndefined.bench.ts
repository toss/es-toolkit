import { isUndefined as isUndefinedToolkit } from 'es-toolkit';
import { isUndefined as isUndefinedToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isUndefined', () => {
  bench('es-toolkit/isUndefined', () => {
    do_not_optimize(isUndefinedToolkit(undefined));
    do_not_optimize(isUndefinedToolkit(null));
    do_not_optimize(isUndefinedToolkit(''));
    do_not_optimize(isUndefinedToolkit(123));
  });

  bench('es-toolkit/compat/isUndefined', () => {
    do_not_optimize(isUndefinedToolkitCompat(undefined));
    do_not_optimize(isUndefinedToolkitCompat(null));
    do_not_optimize(isUndefinedToolkitCompat(''));
    do_not_optimize(isUndefinedToolkitCompat(123));
  });

  bench('lodash/isUndefined', () => {
    do_not_optimize(lodash.isUndefined(undefined));
    do_not_optimize(lodash.isUndefined(null));
    do_not_optimize(lodash.isUndefined(''));
    do_not_optimize(lodash.isUndefined(123));
  });
});
