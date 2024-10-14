import { times as timesCompatToolkit } from 'es-toolkit/compat';
import { times as timesLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('times', () => {
  bench('es-toolkit/compat/times', () => {
    timesCompatToolkit(1000, i => i * 2);
  });

  bench('lodash/times', () => {
    timesLodash(1000, i => i * 2);
  });
});
