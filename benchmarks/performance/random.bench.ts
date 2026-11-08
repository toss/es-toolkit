import { random as randomToolkit } from 'es-toolkit';
import { random as randomCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('random', () => {
  bench('es-toolkit/random', () => {
    randomToolkit(1, 10);
  });

  bench('es-toolkit/compat/random', () => {
    randomCompatToolkit(1, 10);
  });

  bench('lodash/random', () => {
    lodash.random(1, 10, true);
  });
});
