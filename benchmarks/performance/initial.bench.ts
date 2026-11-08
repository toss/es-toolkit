import { initial as initialToolkit } from 'es-toolkit';
import { initial as initialToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

// Helper function to generate a large array
function generateLargeArray(size: number) {
  return Array.from({ length: size }, (_, index) => index);
}

group('initial', () => {
  bench('es-toolkit/initial', () => {
    do_not_optimize(initialToolkit([1, 2, 3, 4, 5, 6]));
  });

  bench('es-toolkit/compat/initial', () => {
    do_not_optimize(initialToolkitCompat([1, 2, 3, 4, 5, 6]));
  });

  bench('lodash/initial', () => {
    do_not_optimize(lodash.initial([1, 2, 3, 4, 5, 6]));
  });
});

group('initial/largeArray', () => {
  const largeArray = generateLargeArray(1000000);

  bench('es-toolkit/initial', () => {
    do_not_optimize(initialToolkit(largeArray));
  });

  bench('es-toolkit/compat/initial', () => {
    do_not_optimize(initialToolkitCompat(largeArray));
  });

  bench('lodash/initial', () => {
    do_not_optimize(lodash.initial(largeArray));
  });
});
