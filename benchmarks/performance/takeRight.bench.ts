import { takeRight as takeRightToolkit } from 'es-toolkit';
import { takeRight as takeRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('takeRight', () => {
  bench('es-toolkit/takeRight', () => {
    do_not_optimize(takeRightToolkit([1, 2, 3, 4], 2));
  });

  bench('es-toolkit/compat/takeRight', () => {
    do_not_optimize(takeRightToolkitCompat([1, 2, 3, 4], 2));
  });

  bench('lodash/takeRight', () => {
    do_not_optimize(lodash.takeRight([1, 2, 3, 4], 2));
  });
});

group('takeRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRight', () => {
    do_not_optimize(takeRightToolkit(largeArray, 100));
  });

  bench('es-toolkit/compat/takeRight', () => {
    do_not_optimize(takeRightToolkitCompat(largeArray, 100));
  });

  bench('lodash/takeRight', () => {
    do_not_optimize(lodash.takeRight(largeArray, 100));
  });
});
