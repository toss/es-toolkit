import { bench, describe } from 'vitest';
import { differenceBy as differenceByToolkit_ } from 'es-toolkit';
import { differenceBy as differenceByLodash_ } from 'lodash';

const differenceByToolkit = differenceByToolkit_;
const differenceByLodash = differenceByLodash_;

describe('differenceBy', () => {
  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash([1.2, 2.3, 3.4], [1.2], Math.floor);
  });
});
