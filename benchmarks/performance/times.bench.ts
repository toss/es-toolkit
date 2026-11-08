import { times as timesCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('times', () => {
  bench('es-toolkit/compat/times', () => {
    timesCompatToolkit(1000, i => i * 2);
  });

  bench('lodash/times', () => {
    lodash.times(1000, i => i * 2);
  });
});
