import { findIndex as findIndexToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findIndex', () => {
  bench('es-toolkit/compat/findIndex', () => {
    do_not_optimize(findIndexToolkit(items, x => x.name === 'Bob'));
    do_not_optimize(findIndexToolkit(items, { name: 'Bob' }));
    do_not_optimize(findIndexToolkit(items, ['name', 'Bob']));
    do_not_optimize(findIndexToolkit(items, 'name'));
  });

  bench('lodash/findIndex', () => {
    do_not_optimize(lodash.findIndex(items, x => x.name === 'Bob'));
    do_not_optimize(lodash.findIndex(items, { name: 'Bob' }));
    do_not_optimize(lodash.findIndex(items, ['name', 'Bob']));
    do_not_optimize(lodash.findIndex(items, 'name'));
  });
});

group('findIndex/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findIndex', () => {
    do_not_optimize(findIndexToolkit(largeArray, x => x.name === 'Name 5000'));
  });

  bench('lodash/findIndex', () => {
    do_not_optimize(lodash.findIndex(largeArray, x => x.name === 'Name 5000'));
  });
});
