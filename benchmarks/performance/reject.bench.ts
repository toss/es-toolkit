import { reject as rejectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

group('reject', () => {
  bench('es-toolkit/reject', () => {
    do_not_optimize(rejectToolkit([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(rejectToolkit(arr, { b: true }));
    do_not_optimize(rejectToolkit(arr, ['a', 1]));
    do_not_optimize(rejectToolkit(arr, items => items.b));
    do_not_optimize(rejectToolkit({ a: 1, b: 2, c: 3 }, 'b'));
  });

  bench('lodash/reject', () => {
    do_not_optimize(lodash.reject([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(lodash.reject(arr, { b: true }));
    do_not_optimize(lodash.reject(arr, ['a', 1]));
    do_not_optimize(lodash.reject(arr, items => items.b));
    do_not_optimize(lodash.reject({ a: 1, b: 2, c: 3 }, 'b'));
  });
});

group('reject/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i, b: i % 2 === 0 }));

  bench('es-toolkit/reject', () => {
    do_not_optimize(rejectToolkit(largeArray, { b: true }));
  });

  bench('lodash/reject', () => {
    do_not_optimize(lodash.reject(largeArray, { b: true }));
  });
});
