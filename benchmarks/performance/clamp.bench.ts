import { bench, describe } from 'vitest';
import { clamp as clampToolkit_ } from 'es-toolkit';
import { clamp as clampCompatToolkit_ } from 'es-toolkit/compat';
import { clamp as clampLodash_ } from 'lodash';

const clampToolkit = clampToolkit_;
const clampCompatToolkit = clampCompatToolkit_;
const clampLodash = clampLodash_;

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
