import { zip as zipToolkit } from 'es-toolkit';
import { zip as zipToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('zip', () => {
  bench('es-toolkit/zip', () => {
    do_not_optimize(zipToolkit([1, 2, 3, 4], [3, 4, 5, 6]));
  });

  bench('es-toolkit/compat/zip', () => {
    do_not_optimize(zipToolkitCompat([1, 2, 3, 4], [3, 4, 5, 6]));
  });

  bench('lodash/zip', () => {
    do_not_optimize(lodash.zip([1, 2, 3, 4], [3, 4, 5, 6]));
  });
});

group('zip/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zip', () => {
    do_not_optimize(zipToolkit(largeArray, largeArray));
  });

  bench('es-toolkit/compat/zip', () => {
    do_not_optimize(zipToolkitCompat(largeArray, largeArray));
  });

  bench('lodash/zip', () => {
    do_not_optimize(lodash.zip(largeArray, largeArray));
  });
});
