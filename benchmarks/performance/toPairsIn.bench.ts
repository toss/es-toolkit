import { toPairsIn as toPairsInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toPairsIn with object', () => {
  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit({ a: 1, b: 2 });
  });

  bench('lodash/toPairsIn', () => {
    lodash.toPairsIn({ a: 1, b: 2 });
  });
});

group('toPairsIn with set', () => {
  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit(new Set([1, 2]));
  });

  bench('lodash/toPairsIn', () => {
    lodash.toPairsIn(new Set([1, 2]));
  });
});

group('toPairsIn with map', () => {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  bench('es-toolkit/toPairsIn', () => {
    toPairsInToolkit(map);
  });

  bench('lodash/toPairsIn', () => {
    lodash.toPairsIn(map);
  });
});
