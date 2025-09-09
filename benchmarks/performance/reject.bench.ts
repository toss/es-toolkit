import { bench, describe } from 'vitest';
import { reject as rejectToolkit_ } from 'es-toolkit/compat';
import { reject as rejectLodash_ } from 'lodash';

const rejectToolkit = rejectToolkit_;
const rejectLodash = rejectLodash_;

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

describe('reject', () => {
  bench('es-toolkit/reject', () => {
    rejectToolkit([1, 2, 3], number => number % 2 === 0);
    rejectToolkit(arr, { b: true });
    rejectToolkit(arr, ['a', 1]);
    rejectToolkit(arr, items => items.b);
    rejectToolkit({ a: 1, b: 2, c: 3 }, 'b');
  });

  bench('lodash/reject', () => {
    rejectLodash([1, 2, 3], number => number % 2 === 0);
    rejectLodash(arr, { b: true });
    rejectLodash(arr, ['a', 1]);
    rejectLodash(arr, items => items.b);
    rejectLodash({ a: 1, b: 2, c: 3 }, 'b');
  });
});

describe('reject/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i, b: i % 2 === 0 }));

  bench('es-toolkit/reject', () => {
    rejectToolkit(largeArray, { b: true });
  });

  bench('lodash/reject', () => {
    rejectLodash(largeArray, { b: true });
  });
});
