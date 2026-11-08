import { findLastIndex as findLastIndexToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findLastIndex', () => {
  bench('es-toolkit/compat/findLastIndex', () => {
    findLastIndexToolkit(items, x => x.name === 'Bob');
    findLastIndexToolkit(items, { name: 'Bob' });
    findLastIndexToolkit(items, ['name', 'Bob']);
    findLastIndexToolkit(items, 'name');
  });

  bench('lodash/findLastIndex', () => {
    lodash.findLastIndex(items, x => x.name === 'Bob');
    lodash.findLastIndex(items, { name: 'Bob' });
    lodash.findLastIndex(items, ['name', 'Bob']);
    lodash.findLastIndex(items, 'name');
  });
});

group('findLastIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLastIndex', () => {
    findLastIndexToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findLastIndex', () => {
    lodash.findLastIndex(largeArray, x => x.name === 'Name 5000');
  });
});
