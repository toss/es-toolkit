import { divide as divideToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('divide function benchmark', () => {
  bench('es-toolkit/compat/divide', () => {
    divideToolkitCompat(3, 4);
    divideToolkitCompat(-3, -4);
    divideToolkitCompat(NaN, 3);
    divideToolkitCompat(3, NaN);
    divideToolkitCompat(NaN, NaN);
  });

  bench('lodash/divide', () => {
    lodash.divide(3, 4);
    lodash.divide(-3, -4);
    lodash.divide(NaN, 3);
    lodash.divide(3, NaN);
    lodash.divide(NaN, NaN);
  });
});
