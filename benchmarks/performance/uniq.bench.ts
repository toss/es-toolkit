import { uniq as uniqToolkit } from 'es-toolkit';
import { uniq as uniqToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('uniq', () => {
  bench('es-toolkit/uniq', () => {
    do_not_optimize(uniqToolkit([11, 2, 3, 44, 11, 2, 3]));
  });

  bench('es-toolkit/compat/uniq', () => {
    do_not_optimize(uniqToolkitCompat([11, 2, 3, 44, 11, 2, 3]));
  });

  bench('lodash/uniq', () => {
    do_not_optimize(lodash.uniq([11, 2, 3, 44, 11, 2, 3]));
  });
});

group('uniq/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniq', () => {
    do_not_optimize(uniqToolkit(largeArray));
  });

  bench('es-toolkit/compat/uniq', () => {
    do_not_optimize(uniqToolkitCompat(largeArray));
  });

  bench('lodash/uniq', () => {
    do_not_optimize(lodash.uniq(largeArray));
  });
});
