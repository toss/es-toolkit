import { findIndex as findIndexToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findIndex', () => {
  bench('es-toolkit/compat/findIndex', () => {
    findIndexToolkit(items, x => x.name === 'Bob');
    findIndexToolkit(items, { name: 'Bob' });
    findIndexToolkit(items, ['name', 'Bob']);
    findIndexToolkit(items, 'name');
  });

  bench('lodash/findIndex', () => {
    lodash.findIndex(items, x => x.name === 'Bob');
    lodash.findIndex(items, { name: 'Bob' });
    lodash.findIndex(items, ['name', 'Bob']);
    lodash.findIndex(items, 'name');
  });
});

group('findIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findIndex', () => {
    findIndexToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findIndex', () => {
    lodash.findIndex(largeArray, x => x.name === 'Name 5000');
  });
});
