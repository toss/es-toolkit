import { uniq as uniqToolkit } from 'es-toolkit';
import { uniq as uniqToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('uniq', () => {
  bench('es-toolkit/uniq', () => {
    uniqToolkit([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('es-toolkit/compat/uniq', () => {
    uniqToolkitCompat([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('lodash/uniq', () => {
    lodash.uniq([11, 2, 3, 44, 11, 2, 3]);
  });
});

group('uniq/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniq', () => {
    uniqToolkit(largeArray);
  });

  bench('es-toolkit/compat/uniq', () => {
    uniqToolkitCompat(largeArray);
  });

  bench('lodash/uniq', () => {
    lodash.uniq(largeArray);
  });
});
