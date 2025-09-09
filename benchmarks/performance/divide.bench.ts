import { bench, describe } from 'vitest';
import { divide as divideToolkitCompat_ } from 'es-toolkit/compat';
import { divide as divideLodash_ } from 'lodash';

const divideToolkitCompat = divideToolkitCompat_;
const divideLodash = divideLodash_;

describe('divide function benchmark', () => {
  bench('es-toolkit/compat/divide', () => {
    divideToolkitCompat(3, 4);
    divideToolkitCompat(-3, -4);
    divideToolkitCompat(NaN, 3);
    divideToolkitCompat(3, NaN);
    divideToolkitCompat(NaN, NaN);
  });

  bench('lodash/divide', () => {
    divideLodash(3, 4);
    divideLodash(-3, -4);
    divideLodash(NaN, 3);
    divideLodash(3, NaN);
    divideLodash(NaN, NaN);
  });
});
