import { fromPairs as fromPairsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('fromPairs', () => {
  const data = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ];

  bench('es-toolkit/fromPairs', () => {
    do_not_optimize(fromPairsToolkit(data));
  });

  bench('lodash/fromPairs', () => {
    do_not_optimize(lodash.fromPairs(data));
  });

  bench('javascript/fromEntries', () => {
    do_not_optimize(Object.fromEntries(data));
  });
});

group('fromPairs/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i]);

  bench('es-toolkit/fromPairs', () => {
    do_not_optimize(fromPairsToolkit(largeArray));
  });

  bench('lodash/fromPairs', () => {
    do_not_optimize(lodash.fromPairs(largeArray));
  });

  bench('javascript/fromEntries', () => {
    do_not_optimize(Object.fromEntries(largeArray));
  });
});
