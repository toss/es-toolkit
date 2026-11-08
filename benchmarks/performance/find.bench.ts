import { find as findToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('find', () => {
  bench('es-toolkit/compat/find', () => {
    findToolkit(items, x => x.name === 'Bob');
    findToolkit(items, { name: 'Bob' });
    findToolkit(items, ['name', 'Bob']);
    findToolkit(items, 'name');
  });

  bench('lodash/find', () => {
    lodash.find(items, x => x.name === 'Bob');
    lodash.find(items, { name: 'Bob' });
    lodash.find(items, ['name', 'Bob']);
    lodash.find(items, 'name');
  });
});

group('find/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/find', () => {
    findToolkit(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/find', () => {
    lodash.find(largeArray, x => x.name === 'Name 5000');
  });
});
