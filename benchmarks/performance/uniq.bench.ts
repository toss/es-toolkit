import { bench, describe } from 'vitest';
import { uniq as uniqToolkit } from 'es-toolkit';
import { uniq as uniqLodash } from 'lodash';

describe('uniq', () => {
  bench('es-toolkit/uniq', () => {
    uniqToolkit([11, 2, 3, 44, 11, 2, 3]);
  });

  bench('lodash/uniq', () => {
    uniqLodash([11, 2, 3, 44, 11, 2, 3]);
  });
});
