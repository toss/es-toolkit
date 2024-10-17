import { uniq as uniqToolkit } from 'es-toolkit';
import { uniq as uniqToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import { uniq as uniqLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('uniq', () => {
  bench('es-toolkit/uniq', () => {
    uniqToolkit([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('es-toolkit/compat/uniq', () => {
    uniqToolkitCompat([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('lodash/uniq', () => {
    uniqLodash([11, 2, 3, 44, 11, 2, 3]);
  });
});

describe('uniq/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, () => randomInt(0, 10000));

  bench('es-toolkit/uniq', () => {
    uniqToolkit(largeArray);
  });

  bench('es-toolkit/compat/uniq', () => {
    uniqToolkitCompat(largeArray);
  });

  bench('lodash/uniq', () => {
    uniqLodash(largeArray);
  });
});
