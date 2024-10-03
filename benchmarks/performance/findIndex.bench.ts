import { bench, describe } from 'vitest';
import { findIndex as findIndexToolkit_ } from 'es-toolkit/compat';
import { findIndex as findIndexLodash_ } from 'lodash';

const findIndexToolkit = findIndexToolkit_;
const findIndexLodash = findIndexLodash_;

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('findIndex', () => {
  bench('es-toolkit/compat/findIndex', () => {
    findIndexToolkit(items, x => x.name === 'Bob');
    findIndexToolkit(items, { name: 'Bob' });
    findIndexToolkit(items, ['name', 'Bob']);
    findIndexToolkit(items, 'name');
  });

  bench('lodash/findIndex', () => {
    findIndexLodash(items, x => x.name === 'Bob');
    findIndexLodash(items, { name: 'Bob' });
    findIndexLodash(items, ['name', 'Bob']);
    findIndexLodash(items, 'name');
  });
});

describe('findIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findIndex', () => {
    findIndexToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findIndex', () => {
    findIndexLodash(largeArray, x => x.name === 'Name 5000');
  });
});
