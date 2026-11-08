import { random as randomToolkit } from 'es-toolkit';
import { random as randomCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('random', () => {
  bench('es-toolkit/random', () => {
    do_not_optimize(randomToolkit(1, 10));
  });

  bench('es-toolkit/compat/random', () => {
    do_not_optimize(randomCompatToolkit(1, 10));
  });

  bench('lodash/random', () => {
    do_not_optimize(lodash.random(1, 10, true));
  });
});
