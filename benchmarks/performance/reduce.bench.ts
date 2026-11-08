import { reduce as reduceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const array = [1, 2, 3, 4, 5];

group('reduce', () => {
  bench('es-toolkit/compat/reduce', () => {
    reduceToolkitCompat(array, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduce', () => {
    lodash.reduce(array, (acc, x) => acc + x, 0);
  });
});

group('reduce - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/reduce', () => {
    reduceToolkitCompat(largeArray, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduce', () => {
    lodash.reduce(largeArray, (acc, x) => acc + x, 0);
  });
});
