import { forEachRight as forEachRightToolkit } from 'es-toolkit';
import { forEachRight as forEachRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('forEachRight', () => {
  bench('es-toolkit/forEachRight', () => {
    do_not_optimize(forEachRightToolkit([1, 2, 3, 4, 5, 6], x => x + 3));
  });

  bench('es-toolkit/compat/forEachRight', () => {
    do_not_optimize(forEachRightToolkitCompat([1, 2, 3, 4, 5, 6], x => x + 3));
  });

  bench('lodash/forEachRight', () => {
    do_not_optimize(lodash.forEachRight([1, 2, 3, 4, 5, 6], x => x + 3));
  });
});

group('forEachRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/forEachRight', () => {
    do_not_optimize(forEachRightToolkit(largeArray, x => x + 3));
  });

  bench('es-toolkit/compat/forEachRight', () => {
    do_not_optimize(forEachRightToolkitCompat(largeArray, x => x + 3));
  });

  bench('lodash/forEachRight', () => {
    do_not_optimize(lodash.forEachRight(largeArray, x => x + 3));
  });
});
