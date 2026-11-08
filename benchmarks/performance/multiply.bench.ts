import { multiply as multiplyToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('multiply function benchmark', () => {
  bench('es-toolkit/compat/multiply', () => {
    multiplyToolkitCompat(3, 4);
    multiplyToolkitCompat(-3, -4);
    multiplyToolkitCompat(NaN, 3);
    multiplyToolkitCompat(3, NaN);
    multiplyToolkitCompat(NaN, NaN);
  });

  bench('lodash/multiply', () => {
    lodash.multiply(3, 4);
    lodash.multiply(-3, -4);
    lodash.multiply(NaN, 3);
    lodash.multiply(3, NaN);
    lodash.multiply(NaN, NaN);
  });
});
