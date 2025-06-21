import { bench, describe } from 'vitest';
import { invertBy as invertByWithCompatToolkit_ } from 'es-toolkit/compat';
import { invertBy as invertByWithLodash_ } from 'lodash';

const invertByWithCompatToolkit = invertByWithCompatToolkit_;
const invertByWithLodash = invertByWithLodash_;

const object = { a: 1, b: 2, c: 1, d: 4 };

describe('invertBy', () => {
  bench('lodash/invertBy', () => {
    invertByWithLodash(object);
  });

  bench('es-toolkit/compat/invertBy', () => {
    invertByWithCompatToolkit(object);
  });
});
