import { bench, describe } from 'vitest';
import { find as findToolkit_ } from 'es-toolkit/compat';
import { find as findLodash_ } from 'lodash';

const findToolkit = findToolkit_;
const findLodash = findLodash_;

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('find', () => {
  bench('es-toolkit/compat/find', () => {
    findToolkit(items, x => x.name === 'Bob');
    findToolkit(items, { name: 'Bob' });
    findToolkit(items, ['name', 'Bob']);
    findToolkit(items, 'name');
  });

  bench('lodash/find', () => {
    findLodash(items, x => x.name === 'Bob');
    findLodash(items, { name: 'Bob' });
    findLodash(items, ['name', 'Bob']);
    findLodash(items, 'name');
  });
});

describe('find/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/find', () => {
    findToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/find', () => {
    findLodash(largeArray, x => x.name === 'Name 5000');
  });
});
