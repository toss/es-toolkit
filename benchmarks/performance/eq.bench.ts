import { eq as eqToolkitCompat } from 'es-toolkit/compat';
import { eq as eqLodash } from 'lodash';
import { bench, describe } from '../bench';

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
