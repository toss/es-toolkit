import { reject as rejectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

group('reject', () => {
  bench('es-toolkit/reject', () => {
    rejectToolkit([1, 2, 3], number => number % 2 === 0);
    rejectToolkit(arr, { b: true });
    rejectToolkit(arr, ['a', 1]);
    rejectToolkit(arr, items => items.b);
    rejectToolkit({ a: 1, b: 2, c: 3 }, 'b');
  });

  bench('lodash/reject', () => {
    lodash.reject([1, 2, 3], number => number % 2 === 0);
    lodash.reject(arr, { b: true });
    lodash.reject(arr, ['a', 1]);
    lodash.reject(arr, items => items.b);
    lodash.reject({ a: 1, b: 2, c: 3 }, 'b');
  });
});

group('reject/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i, b: i % 2 === 0 }));

  bench('es-toolkit/reject', () => {
    rejectToolkit(largeArray, { b: true });
  });

  bench('lodash/reject', () => {
    lodash.reject(largeArray, { b: true });
  });
});
