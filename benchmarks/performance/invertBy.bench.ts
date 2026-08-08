import { bench, describe } from 'vitest';
import { invertBy as invertByWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { invertBy: invertByWithLodash } = lodash;

const object = { a: 1, b: 2, c: 1, d: 4 };

describe('invertBy', () => {
  bench('lodash/invertBy', () => {
    invertByWithLodash(object);
  });

  bench('es-toolkit/compat/invertBy', () => {
    invertByWithCompatToolkit(object);
  });
});
