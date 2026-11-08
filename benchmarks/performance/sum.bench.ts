import { sum as sumToolkit } from 'es-toolkit';
import { sum as sumToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sum', () => {
  bench('es-toolkit/sum', () => {
    sumToolkit([1, 2, 3]);
  });

  bench('es-toolkit/compat/sum', () => {
    sumToolkitCompat([1, 2, 3]);
  });

  bench('lodash/sum', () => {
    lodash.sum([1, 2, 3]);
  });
});

group('sum/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sum', () => {
    sumToolkit(largeArray);
  });

  bench('es-toolkit/compat/sum', () => {
    sumToolkitCompat(largeArray);
  });

  bench('lodash/sum', () => {
    lodash.sum(largeArray);
  });
});
