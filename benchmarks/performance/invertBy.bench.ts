import { invertBy as invertByWithCompatToolkit } from 'es-toolkit/compat';
import { invertBy as invertByWithLodash } from 'lodash';
import { bench, describe } from '../bench';

const object = { a: 1, b: 2, c: 1, d: 4 };

describe('invertBy', () => {
  bench('lodash/invertBy', () => {
    invertByWithLodash(object);
  });

  bench('es-toolkit/compat/invertBy', () => {
    invertByWithCompatToolkit(object);
  });
});
