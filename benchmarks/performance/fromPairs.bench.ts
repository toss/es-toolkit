import { bench, describe } from 'vitest';
import { fromPairs as fromPairsToolkit_ } from 'es-toolkit/compat';
import { fromPairs as fromPairsLodash_ } from 'lodash';

const fromPairsToolkit = fromPairsToolkit_;
const fromPairsLodash = fromPairsLodash_;

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
