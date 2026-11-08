import { takeRight as takeRightToolkit } from 'es-toolkit';
import { takeRight as takeRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('takeRight', () => {
  bench('es-toolkit/takeRight', () => {
    takeRightToolkit([1, 2, 3, 4], 2);
  });

  bench('es-toolkit/compat/takeRight', () => {
    takeRightToolkitCompat([1, 2, 3, 4], 2);
  });

  bench('lodash/takeRight', () => {
    lodash.takeRight([1, 2, 3, 4], 2);
  });
});

group('takeRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRight', () => {
    takeRightToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/takeRight', () => {
    takeRightToolkitCompat(largeArray, 100);
  });

  bench('lodash/takeRight', () => {
    lodash.takeRight(largeArray, 100);
  });
});
