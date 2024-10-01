import { bench, describe } from 'vitest';
import { filter as filterToolkit } from 'es-toolkit/compat';
import { filter as filterLodash } from 'lodash';

const arr = [
  { a: 0, b: true },
  { a: 1, b: true },
  { a: 0, b: false },
];

describe('filter', () => {
  bench('es-toolkit/filter', () => {
    filterToolkit([1, 2, 3], number => number % 2 === 0);
    filterToolkit(arr, { b: true });
    filterToolkit(arr, ['a', 1]);
    filterToolkit(arr, items => items.b);
    filterToolkit({ a: 1, b: 2, c: 3 }, 'b');
  });

  bench('lodash/filter', () => {
    filterLodash([1, 2, 3], number => number % 2 === 0);
    filterLodash(arr, { b: true });
    filterLodash(arr, ['a', 1]);
    filterLodash(arr, items => items.b);
    filterLodash({ a: 1, b: 2, c: 3 }, 'b');
  });
});
