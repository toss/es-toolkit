import { attempt as attemptToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('attempt', () => {
  bench('es-toolkit/attempt', () => {
    do_not_optimize(attemptToolkit(() => undefined));
  });

  bench('lodash/attempt', () => {
    do_not_optimize(lodash.attempt(() => undefined));
  });
});
