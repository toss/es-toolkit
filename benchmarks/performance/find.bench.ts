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
