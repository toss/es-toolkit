import { slice as sliceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('slice', () => {
  const array = Array(1000);
  bench('es-toolkit/compat/slice', () => {
    sliceToolkitCompat(array);
    sliceToolkitCompat(array, 1);
    sliceToolkitCompat(array, 1, 2);
    sliceToolkitCompat(array, 1, 1000);
  });

  bench('lodash/slice', () => {
    lodash.slice(array);
    lodash.slice(array, 1);
    lodash.slice(array, 1, 2);
    lodash.slice(array, 1, 1000);
  });
});
