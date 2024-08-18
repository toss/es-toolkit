import { bench, describe } from 'vitest';
import { join as joinToolkit } from 'es-toolkit';
import { join as joinLodash } from 'lodash';

describe('join', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const separator = ',';

  bench('es-toolkit/join', () => {
    joinToolkit(arr, separator);
  });

  bench('lodash/join', () => {
    joinLodash(arr, separator);
  });
});
