import { add as addToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('add function benchmark', () => {
  bench('es-toolkit/compat/add', () => {
    addToolkitCompat(2, 3);
    addToolkitCompat(-1, -5);
    addToolkitCompat(NaN, 3);
    addToolkitCompat(3, NaN);
    addToolkitCompat(NaN, NaN);
  });

  bench('lodash/add', () => {
    lodash.add(2, 3);
    lodash.add(-1, -5);
    lodash.add(NaN, 3);
    lodash.add(3, NaN);
    lodash.add(NaN, NaN);
  });
});
