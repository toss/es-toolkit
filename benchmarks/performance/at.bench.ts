import { bench, describe } from 'vitest';
import { at as atToolkit } from 'es-toolkit';
import { at as atLodash } from 'lodash';

describe('at', () => {
  bench('es-toolkit/at', () => {
    atToolkit(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
  });

  bench('lodash/at', () => {
    atLodash(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
  });
});
