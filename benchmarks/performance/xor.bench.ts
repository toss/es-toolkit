import { xor as xorToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('xor', () => {
  bench('es-toolkit/xor', () => {
    do_not_optimize(xorToolkit([1, 2, 3, 4], [3, 4, 5, 6]));
  });

  bench('lodash/xor', () => {
    do_not_optimize(lodash.xor([1, 2, 3, 4], [3, 4, 5, 6]));
  });
});

group('xor/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => i + 5000);

  bench('es-toolkit/xor', () => {
    do_not_optimize(xorToolkit(largeArray1, largeArray2));
  });

  bench('lodash/xor', () => {
    do_not_optimize(lodash.xor(largeArray1, largeArray2));
  });
});
