import { bench, describe } from 'vitest';
import { findLast as findLastToolkitCompat_ } from 'es-toolkit/compat';
import { findLast as findLastLodash_ } from 'lodash';

const findLastToolkitCompat = findLastToolkitCompat_;
const findLastLodash = findLastLodash_;

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('findLast', () => {
  bench('es-toolkit/compat/findLast', () => {
    findLastToolkitCompat(items, x => x.name === 'Bob');
    findLastToolkitCompat(items, { name: 'Bob' });
    findLastToolkitCompat(items, ['name', 'Bob']);
    findLastToolkitCompat(items, 'name');
  });

  bench('lodash/findLast', () => {
    findLastLodash(items, x => x.name === 'Bob');
    findLastLodash(items, { name: 'Bob' });
    findLastLodash(items, ['name', 'Bob']);
    findLastLodash(items, 'name');
  });
});

describe('findLast/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLast', () => {
    findLastToolkitCompat(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findLast', () => {
    findLastLodash(largeArray, x => x.name === 'Name 5000');
  });
});
