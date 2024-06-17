import { bench, describe } from 'vitest';
import { difference as differenceToolkit } from 'es-toolkit';
import { difference as differenceLodash } from 'lodash';

describe('difference', () => {
  bench('es-toolkit/difference', () => {
    differenceToolkit([1, 2, 3], [2]);
  });

  bench('lodash/difference', () => {
    differenceLodash([1, 2, 3], [2]);
  });
});
