import { bench, describe } from 'vitest';
import { toPairsIn as toPairsInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { toPairsIn: toPairsInLodash } = lodash;

describe('toPairsIn with object', () => {
  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit({ a: 1, b: 2 });
  });

  bench('lodash/toPairsIn', () => {
    toPairsInLodash({ a: 1, b: 2 });
  });
});

describe('toPairsIn with set', () => {
  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit(new Set([1, 2]));
  });

  bench('lodash/toPairsIn', () => {
    toPairsInLodash(new Set([1, 2]));
  });
});

describe('toPairsIn with map', () => {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit(map);
  });

  bench('lodash/toPairsIn', () => {
    toPairsInLodash(map);
  });
});
