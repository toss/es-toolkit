import { isNull as isNullToolkit } from 'es-toolkit';
import { isNull as isNullToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isNull', () => {
  bench('es-toolkit/isNull', () => {
    do_not_optimize(isNullToolkit(null));
    do_not_optimize(isNullToolkit(undefined));
    do_not_optimize(isNullToolkit(''));
    do_not_optimize(isNullToolkit(123));
  });

  bench('es-toolkit/compat/isNull', () => {
    do_not_optimize(isNullToolkitCompat(null));
    do_not_optimize(isNullToolkitCompat(undefined));
    do_not_optimize(isNullToolkitCompat(''));
    do_not_optimize(isNullToolkitCompat(123));
  });

  bench('lodash/isNull', () => {
    do_not_optimize(lodash.isNull(null));
    do_not_optimize(lodash.isNull(undefined));
    do_not_optimize(lodash.isNull(''));
    do_not_optimize(lodash.isNull(123));
  });
});
