import { bench, describe } from 'vitest';
import { toLength as toLengthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { toLength: toLengthLodash } = lodash;

describe('toLength', () => {
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
    toLengthLodash(3.2);
    toLengthLodash(-1);
    toLengthLodash(Number.MAX_SAFE_INTEGER + 1);
    toLengthLodash('42');
    toLengthLodash(null);
    toLengthLodash(undefined);
    toLengthLodash(NaN);
    toLengthLodash(Infinity);
  });
});
