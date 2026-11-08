import { differenceWith as differenceWithToolkit } from 'es-toolkit';
import { differenceWith as differenceWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('differenceWith', () => {
  bench('es-toolkit/differenceWith', () => {
    do_not_optimize(differenceWithToolkit([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('es-toolkit/compat/differenceWith', () => {
    do_not_optimize(differenceWithCompatToolkit([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('lodash/differenceWith', () => {
    do_not_optimize(lodash.differenceWith([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y)));
  });
});

group('differenceWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceWith', () => {
    do_not_optimize(differenceWithToolkit(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('es-toolkit/compat/differenceWith', () => {
    do_not_optimize(differenceWithCompatToolkit(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('lodash/differenceWith', () => {
    do_not_optimize(lodash.differenceWith(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y)));
  });
});
