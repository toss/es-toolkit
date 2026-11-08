import { mean as meanToolkit } from 'es-toolkit';
import { mean as meanToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('mean', () => {
  bench('es-toolkit/mean', () => {
    do_not_optimize(meanToolkit([1, 2, 3]));
  });

  bench('es-toolkit/compat/mean', () => {
    do_not_optimize(meanToolkitCompat([1, 2, 3]));
  });

  bench('lodash/mean', () => {
    do_not_optimize(lodash.mean([1, 2, 3]));
  });
});

group('mean/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/mean', () => {
    do_not_optimize(meanToolkit(largeArray));
  });

  bench('es-toolkit/compat/mean', () => {
    do_not_optimize(meanToolkitCompat(largeArray));
  });

  bench('lodash/mean', () => {
    do_not_optimize(lodash.mean(largeArray));
  });
});
