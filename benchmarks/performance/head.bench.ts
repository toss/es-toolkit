import { bench, describe } from 'vitest';
import { head as headToolkit } from 'es-toolkit';
import { head as headLodash } from 'lodash';

describe('head', () => {
  bench('es-toolkit/head', () => {
    headToolkit([1, 2, 3, 4]);
  });

  bench('lodash/head', () => {
    headLodash([1, 2, 3, 4]);
  });
});
