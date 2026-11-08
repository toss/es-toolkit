import { sum as sumToolkit } from 'es-toolkit';
import { sum as sumToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sum', () => {
  bench('es-toolkit/sum', () => {
    do_not_optimize(sumToolkit([1, 2, 3]));
  });

  bench('es-toolkit/compat/sum', () => {
    do_not_optimize(sumToolkitCompat([1, 2, 3]));
  });

  bench('lodash/sum', () => {
    do_not_optimize(lodash.sum([1, 2, 3]));
  });
});

group('sum/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sum', () => {
    do_not_optimize(sumToolkit(largeArray));
  });

  bench('es-toolkit/compat/sum', () => {
    do_not_optimize(sumToolkitCompat(largeArray));
  });

  bench('lodash/sum', () => {
    do_not_optimize(lodash.sum(largeArray));
  });
});
