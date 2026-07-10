import { bench, describe } from 'vitest';
import { eq as eqToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { eq: eqLodash } = lodash;

describe('eq', () => {
  bench('es-toolkit/compat/eq', () => {
    eqToolkitCompat(NaN, NaN);
    eqToolkitCompat(NaN, 0);
    eqToolkitCompat(0, NaN);
    eqToolkitCompat(0, -0);
    eqToolkitCompat('abc', 'abc');
  });

  bench('lodash/eq', () => {
    eqLodash(NaN, NaN);
    eqLodash(NaN, 0);
    eqLodash(0, NaN);
    eqLodash(0, -0);
    eqLodash('abc', 'abc');
  });
});
