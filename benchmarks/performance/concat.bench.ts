import { concat as concatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('concat', () => {
  bench('es-toolkit/concat', () => {
    concatToolkit([1, [2, 3]], 4);
  });

  bench('lodash/concat', () => {
    lodash.concat([1, [2, 3]], 4);
  });
});

group('concat/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/concat', () => {
    concatToolkit(largeArray, largeArray);
  });

  bench('lodash/concat', () => {
    lodash.concat(largeArray, largeArray);
  });
});
