import { bench, describe } from 'vitest';
import { findLastIndex as findLastIndexToolkit } from 'es-toolkit/compat';
import { findLastIndex as findLastIndexLodash } from 'lodash';

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
