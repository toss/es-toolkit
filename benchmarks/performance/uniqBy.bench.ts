import { uniqBy as uniqByToolkit } from 'es-toolkit';
import { uniqBy as uniqByToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('uniqBy, small arrays', () => {
  bench('es-toolkit/uniqBy', () => {
    do_not_optimize(uniqByToolkit([2.1, 1.2, 2.3], Math.floor));
  });

  bench('es-toolkit/compat/uniqBy', () => {
    do_not_optimize(uniqByToolkitCompat([2.1, 1.2, 2.3], Math.floor));
  });

  bench('lodash/uniqBy', () => {
    do_not_optimize(lodash.uniqBy([2.1, 1.2, 2.3], Math.floor));
  });
});

group('uniqBy, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniqBy', () => {
    do_not_optimize(uniqByToolkit(largeArray, Math.floor));
  });

  bench('es-toolkit/compat/uniqBy', () => {
    do_not_optimize(uniqByToolkitCompat(largeArray, Math.floor));
  });

  bench('lodash/uniqBy', () => {
    do_not_optimize(lodash.uniqBy(largeArray, Math.floor));
  });
});
