import { bench, describe } from 'vitest';
import { create as createToolkitCompat_ } from 'es-toolkit/compat';
import { create as createToLodash_ } from 'lodash';

const createToolkitCompat = createToolkitCompat_;
const createToLodash = createToLodash_;

describe('create', () => {
  bench('es-toolkit/compat/create', () => {
    createToolkitCompat({ a: 1 }, { b: 2 });
  });

  bench('lodash/create', () => {
    createToLodash({ a: 1 }, { b: 2 });
  });
});
