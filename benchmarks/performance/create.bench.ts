import { bench, describe } from 'vitest';
import { create as createToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { create: createToLodash } = lodash;

describe('create', () => {
  bench('es-toolkit/compat/create', () => {
    createToolkitCompat({ a: 1 }, { b: 2 });
  });

  bench('lodash/create', () => {
    createToLodash({ a: 1 }, { b: 2 });
  });
});
