import { join as joinToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('join', () => {
  bench('es-toolkit', () => {
    do_not_optimize(joinToolkit([1, 2, 3], ','));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.join([1, 2, 3], ','));
  });
});

group('join/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit', () => {
    do_not_optimize(joinToolkit(largeArray, ','));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.join(largeArray, ','));
  });
});
