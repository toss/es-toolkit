import { bench, describe } from 'vitest';
import { clamp as clampToolkit } from 'es-toolkit';
import { clamp as clampLodash } from 'lodash';

describe('clamp', () => {
  bench('es-toolkit/clamp', () => {
    clampToolkit(10, 5, 15);
    clampToolkit(10, 5);
  });

  bench('lodash/clamp', () => {
    clampLodash(10, 5, 15);
    clampLodash(10, 5);
  });
});
