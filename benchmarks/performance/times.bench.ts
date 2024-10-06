import { bench, describe } from 'vitest';
import { times as timesCompatToolkit_ } from 'es-toolkit/compat';
import { times as timesLodash_ } from 'lodash';

const timesCompatToolkit = timesCompatToolkit_;
const timesLodash = timesLodash_;

describe('times', () => {
  bench('es-toolkit/compat/times', () => {
    timesCompatToolkit(1000, i => i * 2);
  });

  bench('lodash/times', () => {
    timesLodash(1000, i => i * 2);
  });
});
