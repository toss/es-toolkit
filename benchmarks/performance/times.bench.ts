import { bench, describe } from 'vitest';
import { times as timesCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { times: timesLodash } = lodash;

describe('times', () => {
  bench('es-toolkit/compat/times', () => {
    timesCompatToolkit(1000, i => i * 2);
  });

  bench('lodash/times', () => {
    timesLodash(1000, i => i * 2);
  });
});
