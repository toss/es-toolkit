import { isLength as isLengthToolkit } from 'es-toolkit';
import { isLength as isLengthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isLength', () => {
  bench('es-toolkit/isLength', () => {
    do_not_optimize(isLengthToolkit(100));
    do_not_optimize(isLengthToolkit(0));
    do_not_optimize(isLengthToolkit(-1));
    do_not_optimize(isLengthToolkit(1.5));
    do_not_optimize(isLengthToolkit(Number.MAX_SAFE_INTEGER));
    do_not_optimize(isLengthToolkit(Number.MAX_SAFE_INTEGER + 1));
    do_not_optimize(isLengthToolkit('100'));
    do_not_optimize(isLengthToolkit(true));
    do_not_optimize(isLengthToolkit(null));
    do_not_optimize(isLengthToolkit(undefined));
    do_not_optimize(isLengthToolkit({}));
    do_not_optimize(isLengthToolkit([]));
  });

  bench('es-toolkit/compat/isLength', () => {
    do_not_optimize(isLengthToolkitCompat(100));
    do_not_optimize(isLengthToolkitCompat(0));
    do_not_optimize(isLengthToolkitCompat(-1));
    do_not_optimize(isLengthToolkitCompat(1.5));
    do_not_optimize(isLengthToolkitCompat(Number.MAX_SAFE_INTEGER));
    do_not_optimize(isLengthToolkitCompat(Number.MAX_SAFE_INTEGER + 1));
    do_not_optimize(isLengthToolkitCompat('100'));
    do_not_optimize(isLengthToolkitCompat(true));
    do_not_optimize(isLengthToolkitCompat(null));
    do_not_optimize(isLengthToolkitCompat(undefined));
    do_not_optimize(isLengthToolkitCompat({}));
    do_not_optimize(isLengthToolkitCompat([]));
  });

  bench('lodash/isLength', () => {
    do_not_optimize(lodash.isLength(100));
    do_not_optimize(lodash.isLength(0));
    do_not_optimize(lodash.isLength(-1));
    do_not_optimize(lodash.isLength(1.5));
    do_not_optimize(lodash.isLength(Number.MAX_SAFE_INTEGER));
    do_not_optimize(lodash.isLength(Number.MAX_SAFE_INTEGER + 1));
    do_not_optimize(lodash.isLength('100'));
    do_not_optimize(lodash.isLength(true));
    do_not_optimize(lodash.isLength(null));
    do_not_optimize(lodash.isLength(undefined));
    do_not_optimize(lodash.isLength({}));
    do_not_optimize(lodash.isLength([]));
  });
});
