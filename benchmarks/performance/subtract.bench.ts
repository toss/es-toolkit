import { subtract as subtractToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('subtract function benchmark', () => {
  bench('es-toolkit/compat/subtract', () => {
    subtractToolkitCompat(2, 3);
    subtractToolkitCompat(-1, -5);
    subtractToolkitCompat(NaN, 3);
    subtractToolkitCompat(3, NaN);
    subtractToolkitCompat(NaN, NaN);
  });

  bench('lodash/subtract', () => {
    lodash.subtract(2, 3);
    lodash.subtract(-1, -5);
    lodash.subtract(NaN, 3);
    lodash.subtract(3, NaN);
    lodash.subtract(NaN, NaN);
  });
});
