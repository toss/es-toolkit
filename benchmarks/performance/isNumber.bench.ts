import { isNumber as isNumberToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isNumber', () => {
  bench('es-toolkit/isNumber', () => {
    do_not_optimize(isNumberToolkit(1));
    do_not_optimize(isNumberToolkit(1.5));
    do_not_optimize(isNumberToolkit(NaN));
    do_not_optimize(isNumberToolkit(Infinity));
    do_not_optimize(isNumberToolkit('1'));
    do_not_optimize(isNumberToolkit(true));
    do_not_optimize(isNumberToolkit(null));
    do_not_optimize(isNumberToolkit(undefined));
    do_not_optimize(isNumberToolkit({}));
    do_not_optimize(isNumberToolkit([]));
  });

  bench('lodash/isNumber', () => {
    do_not_optimize(lodash.isNumber(1));
    do_not_optimize(lodash.isNumber(1.5));
    do_not_optimize(lodash.isNumber(NaN));
    do_not_optimize(lodash.isNumber(Infinity));
    do_not_optimize(lodash.isNumber('1'));
    do_not_optimize(lodash.isNumber(true));
    do_not_optimize(lodash.isNumber(null));
    do_not_optimize(lodash.isNumber(undefined));
    do_not_optimize(lodash.isNumber({}));
    do_not_optimize(lodash.isNumber([]));
  });
});
