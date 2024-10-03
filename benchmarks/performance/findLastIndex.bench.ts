import { bench, describe } from 'vitest';
import { findLastIndex as findLastIndexToolkit_ } from 'es-toolkit/compat';
import { findLastIndex as findLastIndexLodash_ } from 'lodash';

const findLastIndexToolkit = findLastIndexToolkit_;
const findLastIndexLodash = findLastIndexLodash_;

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('findLastIndex', () => {
  bench('es-toolkit/compat/findLastIndex', () => {
    findLastIndexToolkit(items, x => x.name === 'Bob');
    findLastIndexToolkit(items, { name: 'Bob' });
    findLastIndexToolkit(items, ['name', 'Bob']);
    findLastIndexToolkit(items, 'name');
  });

  bench('lodash/findLastIndex', () => {
    findLastIndexLodash(items, x => x.name === 'Bob');
    findLastIndexLodash(items, { name: 'Bob' });
    findLastIndexLodash(items, ['name', 'Bob']);
    findLastIndexLodash(items, 'name');
  });
});

describe('findLastIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLastIndex', () => {
    findLastIndexToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findLastIndex', () => {
    findLastIndexLodash(largeArray, x => x.name === 'Name 5000');
  });
});
