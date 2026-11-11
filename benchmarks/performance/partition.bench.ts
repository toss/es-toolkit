import { partition as partitionToolkit } from 'es-toolkit';
import { partition as partitionToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('partition', () => {
  bench('es-toolkit/partition', () => {
    do_not_optimize(partitionToolkit([1, 2, 3, 4, 5], x => x < 3));
  });

  bench('es-toolkit/partition/compat', () => {
    do_not_optimize(partitionToolkitCompat([1, 2, 3, 4, 5], x => x < 3));
  });

  bench('lodash/partition', () => {
    do_not_optimize(lodash.partition([1, 2, 3], x => x < 3));
  });
});

group('partition/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);

  bench('es-toolkit/partition', () => {
    do_not_optimize(partitionToolkit(largeArray, x => x < 5000));
  });

  bench('es-toolkit/partition/compat', () => {
    do_not_optimize(partitionToolkitCompat(largeArray, x => x < 5000));
  });

  bench('lodash/partition', () => {
    do_not_optimize(lodash.partition(largeArray, x => x < 5000));
  });
});
