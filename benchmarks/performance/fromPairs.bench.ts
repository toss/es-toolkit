import { fromPairs as fromPairsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('fromPairs', () => {
  const data = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ];

  bench('es-toolkit/fromPairs', () => {
    fromPairsToolkit(data);
  });

  bench('lodash/fromPairs', () => {
    lodash.fromPairs(data);
  });

  bench('javascript/fromEntries', () => {
    Object.fromEntries(data);
  });
});

group('fromPairs/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i]);

  bench('es-toolkit/fromPairs', () => {
    fromPairsToolkit(largeArray);
  });

  bench('lodash/fromPairs', () => {
    lodash.fromPairs(largeArray);
  });

  bench('javascript/fromEntries', () => {
    Object.fromEntries(largeArray);
  });
});
