import { toLength as toLengthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toLength', () => {
  bench('es-toolkit/compat/toLength', () => {
    toLengthToolkitCompat(3.2);
    toLengthToolkitCompat(-1);
    toLengthToolkitCompat(Number.MAX_SAFE_INTEGER + 1);
    toLengthToolkitCompat('42');
    toLengthToolkitCompat(null);
    toLengthToolkitCompat(undefined);
    toLengthToolkitCompat(NaN);
    toLengthToolkitCompat(Infinity);
  });

  bench('lodash/toLength', () => {
    lodash.toLength(3.2);
    lodash.toLength(-1);
    lodash.toLength(Number.MAX_SAFE_INTEGER + 1);
    lodash.toLength('42');
    lodash.toLength(null);
    lodash.toLength(undefined);
    lodash.toLength(NaN);
    lodash.toLength(Infinity);
  });
});
