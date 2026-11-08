import { max as maxToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('max', () => {
  bench('es-toolkit/max', () => {
    do_not_optimize(maxToolkit([1, 2, 3]));
  });

  bench('lodash/max', () => {
    do_not_optimize(lodash.max([1, 2, 3]));
  });
});

group('max/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/max', () => {
    do_not_optimize(maxToolkit(largeArray));
  });

  bench('lodash/max', () => {
    do_not_optimize(lodash.max(largeArray));
  });
});
