import { bench, describe } from 'vitest';
import { toPairs as toPairsToolkit_ } from 'es-toolkit/compat';
import { toPairs as toPairsLodash_ } from 'lodash';

const toPairsToolkit = toPairsToolkit_;
const toPairsLodash = toPairsLodash_;

describe('toPairs with object', () => {
  bench('es-toolkit/toPairs', () => {
    toPairsToolkit({ a: 1, b: 2 });
  });

  bench('lodash/toPairs', () => {
    toPairsLodash({ a: 1, b: 2 });
  });
});

describe('toPairs with set', () => {
  bench('es-toolkit/toPairs', () => {
    toPairsToolkit(new Set([1, 2]));
  });

  bench('lodash/toPairs', () => {
    toPairsLodash(new Set([1, 2]));
  });
});

describe('toPairs with map', () => {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  bench('es-toolkit/toPairs', () => {
    toPairsToolkit(map);
  });

  bench('lodash/toPairs', () => {
    toPairsLodash(map);
  });
});
