import { filter as filterToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

group('filter', () => {
  bench('es-toolkit/filter', () => {
    do_not_optimize(filterToolkit([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(filterToolkit(arr, { b: true }));
    do_not_optimize(filterToolkit(arr, ['a', 1]));
    do_not_optimize(filterToolkit(arr, items => items.b));
    do_not_optimize(filterToolkit({ a: 1, b: 2, c: 3 }, 'b'));
  });

  bench('lodash/filter', () => {
    do_not_optimize(lodash.filter([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(lodash.filter(arr, { b: true }));
    do_not_optimize(lodash.filter(arr, ['a', 1]));
    do_not_optimize(lodash.filter(arr, items => items.b));
    do_not_optimize(lodash.filter({ a: 1, b: 2, c: 3 }, 'b'));
  });
});

group('filter/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i, b: i % 2 === 0 }));

  bench('es-toolkit/filter', () => {
    do_not_optimize(filterToolkit(largeArray, { b: true }));
  });

  bench('lodash/filter', () => {
    do_not_optimize(lodash.filter(largeArray, { b: true }));
  });
});
