import { bench, describe } from 'vitest';
import { take as takeToolkit_ } from 'es-toolkit';
import { take as takeLodash_ } from 'lodash';

const takeToolkit = takeToolkit_;
const takeLodash = takeLodash_;

describe('take', () => {
  bench('es-toolkit/take', () => {
    takeToolkit([1, 2, 3, 4], 2);
  });

  bench('lodash/take', () => {
    takeLodash([1, 2, 3, 4], 2);
  });
});
