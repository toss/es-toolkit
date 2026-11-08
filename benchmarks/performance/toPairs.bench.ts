import { toPairs as toPairsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toPairs with object', () => {
  bench('es-toolkit/toPairs', () => {
    do_not_optimize(toPairsToolkit({ a: 1, b: 2 }));
  });

  bench('lodash/toPairs', () => {
    do_not_optimize(lodash.toPairs({ a: 1, b: 2 }));
  });
});

group('toPairs with set', () => {
  bench('es-toolkit/toPairs', () => {
    do_not_optimize(toPairsToolkit(new Set([1, 2])));
  });

  bench('lodash/toPairs', () => {
    do_not_optimize(lodash.toPairs(new Set([1, 2])));
  });
});

group('toPairs with map', () => {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  bench('es-toolkit/toPairs', () => {
    do_not_optimize(toPairsToolkit(map));
  });

  bench('lodash/toPairs', () => {
    do_not_optimize(lodash.toPairs(map));
  });
});
