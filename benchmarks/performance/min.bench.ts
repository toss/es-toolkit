import { min as minToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('min', () => {
  bench('es-toolkit/min', () => {
    do_not_optimize(minToolkit([1, 2, 3]));
  });

  bench('lodash/min', () => {
    do_not_optimize(lodash.min([1, 2, 3]));
  });
});

group('min/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/min', () => {
    do_not_optimize(minToolkit(largeArray));
  });

  bench('lodash/min', () => {
    do_not_optimize(lodash.min(largeArray));
  });
});
