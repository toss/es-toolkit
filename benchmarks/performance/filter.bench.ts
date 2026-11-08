import { filter as filterToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

group('filter', () => {
  bench('es-toolkit/filter', () => {
    filterToolkit([1, 2, 3], number => number % 2 === 0);
    filterToolkit(arr, { b: true });
    filterToolkit(arr, ['a', 1]);
    filterToolkit(arr, items => items.b);
    filterToolkit({ a: 1, b: 2, c: 3 }, 'b');
  });

  bench('lodash/filter', () => {
    lodash.filter([1, 2, 3], number => number % 2 === 0);
    lodash.filter(arr, { b: true });
    lodash.filter(arr, ['a', 1]);
    lodash.filter(arr, items => items.b);
    lodash.filter({ a: 1, b: 2, c: 3 }, 'b');
  });
});

group('filter/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i, b: i % 2 === 0 }));

  bench('es-toolkit/filter', () => {
    filterToolkit(largeArray, { b: true });
  });

  bench('lodash/filter', () => {
    lodash.filter(largeArray, { b: true });
  });
});
