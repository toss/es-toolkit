import { bench, describe } from 'vitest';
import { eq as eqToolkitCompat_ } from 'es-toolkit/compat';
import { eq as eqLodash_ } from 'lodash';

const eqToolkitCompat = eqToolkitCompat_;
const eqLodash = eqLodash_;

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
