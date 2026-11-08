import { eq as eqToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('eq', () => {
  bench('es-toolkit/compat/eq', () => {
    eqToolkitCompat(NaN, NaN);
    eqToolkitCompat(NaN, 0);
    eqToolkitCompat(0, NaN);
    eqToolkitCompat(0, -0);
    eqToolkitCompat('abc', 'abc');
  });

  bench('lodash/eq', () => {
    lodash.eq(NaN, NaN);
    lodash.eq(NaN, 0);
    lodash.eq(0, NaN);
    lodash.eq(0, -0);
    lodash.eq('abc', 'abc');
  });
});
