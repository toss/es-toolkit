import { dropRight as dropRightToolkit } from 'es-toolkit';
import { dropRight as dropRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('dropRight', () => {
  bench('es-toolkit/dropRight', () => {
    do_not_optimize(dropRightToolkit([1, 2, 3, 4, 5, 6], 3));
  });

  bench('es-toolkit/compat/dropRight', () => {
    do_not_optimize(dropRightToolkitCompat([1, 2, 3, 4, 5, 6], 3));
  });

  bench('lodash/dropRight', () => {
    do_not_optimize(lodash.dropRight([1, 2, 3, 4, 5, 6], 3));
  });
});

group('dropRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRight', () => {
    do_not_optimize(dropRightToolkit(largeArray, 5000));
  });

  bench('es-toolkit/compat/dropRight', () => {
    do_not_optimize(dropRightToolkitCompat(largeArray, 5000));
  });

  bench('lodash/dropRight', () => {
    do_not_optimize(lodash.dropRight(largeArray, 5000));
  });
});
