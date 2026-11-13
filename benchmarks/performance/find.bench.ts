import { find as findToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('find', () => {
  bench('es-toolkit/compat/find', () => {
    do_not_optimize(findToolkit(items, x => x.name === 'Bob'));
    do_not_optimize(findToolkit(items, { name: 'Bob' }));
    do_not_optimize(findToolkit(items, ['name', 'Bob']));
    do_not_optimize(findToolkit(items, 'name'));
  });

  bench('lodash/find', () => {
    do_not_optimize(lodash.find(items, x => x.name === 'Bob'));
    do_not_optimize(lodash.find(items, { name: 'Bob' }));
    do_not_optimize(lodash.find(items, ['name', 'Bob']));
    do_not_optimize(lodash.find(items, 'name'));
  });
});

group('find/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/find', () => {
    do_not_optimize(findToolkit(largeArray, x => x.name === 'Name 5000'));
  });

  bench('lodash/find', () => {
    do_not_optimize(lodash.find(largeArray, x => x.name === 'Name 5000'));
  });
});
