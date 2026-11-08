import { findLast as findLastToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

group('findLast', () => {
  bench('es-toolkit/compat/findLast', () => {
    do_not_optimize(findLastToolkitCompat(items, x => x.name === 'Bob'));
    do_not_optimize(findLastToolkitCompat(items, { name: 'Bob' }));
    do_not_optimize(findLastToolkitCompat(items, ['name', 'Bob']));
    do_not_optimize(findLastToolkitCompat(items, 'name'));
  });

  bench('lodash/findLast', () => {
    do_not_optimize(lodash.findLast(items, x => x.name === 'Bob'));
    do_not_optimize(lodash.findLast(items, { name: 'Bob' }));
    do_not_optimize(lodash.findLast(items, ['name', 'Bob']));
    do_not_optimize(lodash.findLast(items, 'name'));
  });
});

group('findLast/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Name ${i}` }));

  bench('es-toolkit/compat/findLast', () => {
    do_not_optimize(findLastToolkitCompat(largeArray, x => x.name === 'Name 5000'));
  });

  bench('lodash/findLast', () => {
    do_not_optimize(lodash.findLast(largeArray, x => x.name === 'Name 5000'));
  });
});
