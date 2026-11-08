import { findLast as findLastToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findLast', () => {
  bench('es-toolkit/compat/findLast', () => {
    findLastToolkitCompat(items, x => x.name === 'Bob');
    findLastToolkitCompat(items, { name: 'Bob' });
    findLastToolkitCompat(items, ['name', 'Bob']);
    findLastToolkitCompat(items, 'name');
  });

  bench('lodash/findLast', () => {
    lodash.findLast(items, x => x.name === 'Bob');
    lodash.findLast(items, { name: 'Bob' });
    lodash.findLast(items, ['name', 'Bob']);
    lodash.findLast(items, 'name');
  });
});

group('findLast/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLast', () => {
    findLastToolkitCompat(largeArray, x => x.name === 'Name 5000');
  });

  bench('lodash/findLast', () => {
    lodash.findLast(largeArray, x => x.name === 'Name 5000');
  });
});
