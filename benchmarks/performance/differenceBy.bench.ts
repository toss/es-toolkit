import { bench, describe } from 'vitest';
import { differenceBy as differenceByToolkit_ } from 'es-toolkit';
import { differenceBy as differenceByCompatToolkit_ } from 'es-toolkit/compat';
import { differenceBy as differenceByLodash_ } from 'lodash';

const differenceByToolkit = differenceByToolkit_;
const differenceByCompatToolkit = differenceByCompatToolkit_;
const differenceByLodash = differenceByLodash_;

describe('differenceBy', () => {
  bench('es-toolkit/differenceBy', () => {
    differenceByToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('es-toolkit/compat/differenceBy', () => {
    differenceByCompatToolkit([1.2, 2.3, 3.4], [1.2], Math.floor);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash([1.2, 2.3, 3.4], [1.2], Math.floor);
  });
});
