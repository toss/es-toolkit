import { bench, describe } from 'vitest';
import { multiply as multiplyToolkitCompat_ } from 'es-toolkit/compat';
import { multiply as multiplyLodash_ } from 'lodash';

const multiplyToolkitCompat = multiplyToolkitCompat_;
const multiplyLodash = multiplyLodash_;

describe('multiply function benchmark', () => {
  bench('es-toolkit/compat/multiply', () => {
    multiplyToolkitCompat(3, 4);
    multiplyToolkitCompat(-3, -4);
    multiplyToolkitCompat(NaN, 3);
    multiplyToolkitCompat(3, NaN);
    multiplyToolkitCompat(NaN, NaN);
  });

  bench('lodash/multiply', () => {
    multiplyLodash(3, 4);
    multiplyLodash(-3, -4);
    multiplyLodash(NaN, 3);
    multiplyLodash(3, NaN);
    multiplyLodash(NaN, NaN);
  });
});
