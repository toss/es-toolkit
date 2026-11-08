import { clamp as clampToolkit } from 'es-toolkit';
import { clamp as clampCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('clamp', () => {
  bench('es-toolkit/clamp', () => {
    clampToolkit(10, 5, 15);
    clampToolkit(10, 5);
  });

  bench('es-toolkit/compat/clamp', () => {
    clampCompatToolkit(10, 5, 15);
    clampCompatToolkit(10, 5);
  });

  bench('lodash/clamp', () => {
    lodash.clamp(10, 5, 15);
    lodash.clamp(10, 5);
  });
});
