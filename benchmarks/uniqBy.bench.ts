import { bench, describe } from 'vitest';
import { uniqBy as uniqByToolkit } from 'es-toolkit';
import { uniqBy as uniqByLodash } from 'lodash';
import { randomInt } from 'crypto';

describe('uniqBy, small arrays', () => {
  bench('es-toolkit', () => {
    uniqByToolkit([2.1, 1.2, 2.3], Math.floor);
  });

  bench('lodash', () => {
    uniqByLodash([2.1, 1.2, 2.3], Math.floor);
  });
});

describe('uniqBy, large arrays', () => {
  const array = Array.from({ length: 10000 }).map(() => randomInt(0, 10000));

  bench('es-toolkit', () => {
    uniqByToolkit(array, Math.floor);
  });

  bench('lodash', () => {
    uniqByLodash(array, Math.floor);
  });
});
