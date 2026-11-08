import { findLastIndex as findLastIndexToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findLastIndex', () => {
  bench('es-toolkit/compat/findLastIndex', () => {
    do_not_optimize(findLastIndexToolkit(items, x => x.name === 'Bob'));
    do_not_optimize(findLastIndexToolkit(items, { name: 'Bob' }));
    do_not_optimize(findLastIndexToolkit(items, ['name', 'Bob']));
    do_not_optimize(findLastIndexToolkit(items, 'name'));
  });

  bench('lodash/findLastIndex', () => {
    do_not_optimize(lodash.findLastIndex(items, x => x.name === 'Bob'));
    do_not_optimize(lodash.findLastIndex(items, { name: 'Bob' }));
    do_not_optimize(lodash.findLastIndex(items, ['name', 'Bob']));
    do_not_optimize(lodash.findLastIndex(items, 'name'));
  });
});

group('findLastIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLastIndex', () => {
    do_not_optimize(findLastIndexToolkit(largeArray, x => x.name === 'Name 5000'));
  });

  bench('lodash/findLastIndex', () => {
    do_not_optimize(lodash.findLastIndex(largeArray, x => x.name === 'Name 5000'));
  });
});
