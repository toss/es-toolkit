import { differenceWith as differenceWithToolkit } from 'es-toolkit';
import { differenceWith as differenceWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('differenceWith', () => {
  bench('es-toolkit/differenceWith', () => {
    differenceWithToolkit([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('es-toolkit/compat/differenceWith', () => {
    differenceWithCompatToolkit([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/differenceWith', () => {
    lodash.differenceWith([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

group('differenceWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 500.5);

  bench('es-toolkit/differenceWith', () => {
    differenceWithToolkit(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('es-toolkit/compat/differenceWith', () => {
    differenceWithCompatToolkit(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/differenceWith', () => {
    lodash.differenceWith(largeArray, largeArray2, (x, y) => Math.floor(x) === Math.floor(y));
  });
});
