import { fromPairs as fromPairsToolkit } from 'es-toolkit/compat';
import { fromPairs as fromPairsLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('fromPairs', () => {
  const data = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ];

  bench('es-toolkit/fromPairs', () => {
    fromPairsToolkit(data);
  });

  bench('lodash/fromPairs', () => {
    fromPairsLodash(data);
  });

  bench('javascript/fromEntries', () => {
    Object.fromEntries(data);
  });
});

describe('fromPairs/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i]);

  bench('es-toolkit/fromPairs', () => {
    fromPairsToolkit(largeArray);
  });

  bench('lodash/fromPairs', () => {
    fromPairsLodash(largeArray);
  });

  bench('javascript/fromEntries', () => {
    Object.fromEntries(largeArray);
  });
});
