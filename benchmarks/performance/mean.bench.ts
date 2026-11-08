import { mean as meanToolkit } from 'es-toolkit';
import { mean as meanToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('mean', () => {
  bench('es-toolkit/mean', () => {
    meanToolkit([1, 2, 3]);
  });

  bench('es-toolkit/compat/mean', () => {
    meanToolkitCompat([1, 2, 3]);
  });

  bench('lodash/mean', () => {
    lodash.mean([1, 2, 3]);
  });
});

group('mean/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/mean', () => {
    meanToolkit(largeArray);
  });

  bench('es-toolkit/compat/mean', () => {
    meanToolkitCompat(largeArray);
  });

  bench('lodash/mean', () => {
    lodash.mean(largeArray);
  });
});
