import { concat as concatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('concat', () => {
  bench('es-toolkit/concat', () => {
    do_not_optimize(concatToolkit([1, [2, 3]], 4));
  });

  bench('lodash/concat', () => {
    do_not_optimize(lodash.concat([1, [2, 3]], 4));
  });
});

group('concat/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/concat', () => {
    do_not_optimize(concatToolkit(largeArray, largeArray));
  });

  bench('lodash/concat', () => {
    do_not_optimize(lodash.concat(largeArray, largeArray));
  });
});
