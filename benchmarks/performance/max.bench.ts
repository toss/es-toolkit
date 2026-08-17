import { bench, describe } from 'vitest';
import { max as maxToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { max: maxLodash } = lodash;

describe('max', () => {
  bench('es-toolkit/max', () => {
    maxToolkit([1, 2, 3]);
  });

  bench('lodash/max', () => {
    maxLodash([1, 2, 3]);
  });
});

describe('max/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/max', () => {
    maxToolkit(largeArray);
  });

  bench('lodash/max', () => {
    maxLodash(largeArray);
  });
});
