import { clamp as clampToolkit } from 'es-toolkit';
import { clamp as clampCompatToolkit } from 'es-toolkit/compat';
import { clamp as clampLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('clamp', () => {
  bench('es-toolkit/clamp', () => {
    clampToolkit(10, 5, 15);
    clampToolkit(10, 5);
  });

  bench('es-toolkit/compat/clamp', () => {
    clampCompatToolkit(10, 5, 15);
    clampCompatToolkit(10, 5);
  });

  bench('lodash/clamp', () => {
    clampLodash(10, 5, 15);
    clampLodash(10, 5);
  });
});
