import { bench, describe } from 'vitest';
import { head as headToolkit } from 'es-toolkit';
import { head as headCompatToolkit } from 'es-toolkit/compat';
import { head as headLodash } from 'lodash';

describe('head', () => {
  bench('es-toolkit/head', () => {
    headToolkit([1, 2, 3, 4]);
  });

  bench('es-toolkit/compat/head', () => {
    headCompatToolkit([1, 2, 3, 4]);
  });

  bench('lodash/head', () => {
    headLodash([1, 2, 3, 4]);
  });
});
