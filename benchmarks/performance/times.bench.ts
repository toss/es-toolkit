import { times as timesCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('times', () => {
  bench('es-toolkit/compat/times', () => {
    do_not_optimize(timesCompatToolkit(1000, i => i * 2));
  });

  bench('lodash/times', () => {
    do_not_optimize(lodash.times(1000, i => i * 2));
  });
});
