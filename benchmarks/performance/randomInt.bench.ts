import { randomInt as randomIntToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('randomInt', () => {
  bench('es-toolkit/randomInt', () => {
    do_not_optimize(randomIntToolkit(1, 10));
  });

  bench('lodash/randomInt', () => {
    do_not_optimize(lodash.random(1, 10, false));
  });
});
