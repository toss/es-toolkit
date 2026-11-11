import { toPairsIn as toPairsInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toPairsIn with object', () => {
  bench('es-toolkit/toPairsIn', () => {
    do_not_optimize(toPairsInToolkit({ a: 1, b: 2 }));
  });

  bench('lodash/toPairsIn', () => {
    do_not_optimize(lodash.toPairsIn({ a: 1, b: 2 }));
  });
});

group('toPairsIn with set', () => {
  bench('es-toolkit/toPairsIn', () => {
    do_not_optimize(toPairsInToolkit(new Set([1, 2])));
  });

  bench('lodash/toPairsIn', () => {
    do_not_optimize(lodash.toPairsIn(new Set([1, 2])));
  });
});

group('toPairsIn with map', () => {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  bench('es-toolkit/toPairsIn', () => {
    do_not_optimize(toPairsInToolkit(map));
  });

  bench('lodash/toPairsIn', () => {
    do_not_optimize(lodash.toPairsIn(map));
  });
});
