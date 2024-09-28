import { bench, describe } from 'vitest';
import { join as joinToolkit } from 'es-toolkit/compat';
import { join as joinLodash } from 'lodash';

describe('join', () => {
  bench('es-toolkit', () => {
    joinToolkit([1, 2, 3], ',');
  });

  bench('lodash', () => {
    joinLodash([1, 2, 3], ',');
  });
});
