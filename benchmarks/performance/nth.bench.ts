import { nth as nthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('nth', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nth', () => {
    nthToolkitCompat(array, 1);
    nthToolkitCompat(array, -1);
  });

  bench('lodash/nth', () => {
    lodash.nth(array, 1);
    lodash.nth(array, -1);
  });
});

group('nth/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nth', () => {
    nthToolkitCompat(largeArray, 1);
    nthToolkitCompat(largeArray, -1);
  });

  bench('lodash/nth', () => {
    lodash.nth(largeArray, 1);
    lodash.nth(largeArray, -1);
  });
});
