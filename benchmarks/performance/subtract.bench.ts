import { bench, describe } from 'vitest';
import { subtract as subtractToolkitCompat_ } from 'es-toolkit/compat';
import { subtract as subtractLodash_ } from 'lodash';

const subtractToolkitCompat = subtractToolkitCompat_;
const subtractLodash = subtractLodash_;

describe('subtract function benchmark', () => {
  bench('es-toolkit/compat/subtract', () => {
    subtractToolkitCompat(2, 3);
    subtractToolkitCompat(-1, -5);
    subtractToolkitCompat(NaN, 3);
    subtractToolkitCompat(3, NaN);
    subtractToolkitCompat(NaN, NaN);
  });

  bench('lodash/subtract', () => {
    subtractLodash(2, 3);
    subtractLodash(-1, -5);
    subtractLodash(NaN, 3);
    subtractLodash(3, NaN);
    subtractLodash(NaN, NaN);
  });
});
