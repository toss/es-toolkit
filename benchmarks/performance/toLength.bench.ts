import { toLength as toLengthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toLength', () => {
  bench('es-toolkit/compat/toLength', () => {
    do_not_optimize(toLengthToolkitCompat(3.2));
    do_not_optimize(toLengthToolkitCompat(-1));
    do_not_optimize(toLengthToolkitCompat(Number.MAX_SAFE_INTEGER + 1));
    do_not_optimize(toLengthToolkitCompat('42'));
    do_not_optimize(toLengthToolkitCompat(null));
    do_not_optimize(toLengthToolkitCompat(undefined));
    do_not_optimize(toLengthToolkitCompat(NaN));
    do_not_optimize(toLengthToolkitCompat(Infinity));
  });

  bench('lodash/toLength', () => {
    do_not_optimize(lodash.toLength(3.2));
    do_not_optimize(lodash.toLength(-1));
    do_not_optimize(lodash.toLength(Number.MAX_SAFE_INTEGER + 1));
    do_not_optimize(lodash.toLength('42'));
    do_not_optimize(lodash.toLength(null));
    do_not_optimize(lodash.toLength(undefined));
    do_not_optimize(lodash.toLength(NaN));
    do_not_optimize(lodash.toLength(Infinity));
  });
});
